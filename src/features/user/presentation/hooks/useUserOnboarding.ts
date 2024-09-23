import useSaveUser from "@/features/profile/application/adapters/services/useSaveUser";
import { useUpgradeSubscription } from "@/features/profile/presentation/helpers/useUpgradeSubscription";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getEducationSystemOptions } from "../../domain/entities/education-systems/global";
import { UserType, userSchema } from "../../domain/entities/user-schema";
import { useCheckHostnameAvailability } from "./useCheckHostnameAvailability";

const steps = [
  { id: "personal", title: "Informations personnelles" },
  { id: "education", title: "Détails de l'éducation" },
  { id: "subscription", title: "Abonnement" },
  { id: "complete", title: "Terminer" },
];

export function useUserOnboarding({ user }: { user: UserType }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isHostnameAvailable, setIsHostnameAvailable] = useState<
    boolean | null
  >(null);
  const { mutateAsync: saveUser, isPending: isSavingUser } = useSaveUser();
  const { handleUpgradeClick, isUpdating: isUpdatingSubscription } =
    useUpgradeSubscription();
  const router = useRouter();

  const form = useForm<Omit<UserType, "_id" | "userId">>({
    resolver: zodResolver(
      userSchema.omit({ _id: true, userId: true }).extend({
        hostname: z
          .string()
          .min(1, "Le nom d'hôte est requis")
          .refine(
            () => isHostnameAvailable === true,
            "Ce nom d'hôte n'est pas disponible"
          ),
      })
    ),
    defaultValues: { ...user, hostname: user.hostname ?? "" },
  });
  const { checkHostnameAvailability, isLoading: isCheckingHostname } =
    useCheckHostnameAvailability();

  const selectedSystem = form.watch("educationSystem");
  const subjectsOptions = getEducationSystemOptions(selectedSystem);
  const isPending = isUpdating || isUpdatingSubscription || isCheckingHostname;

  const debouncedCheckHostname = useCallback(
    debounce(async (hostname: string) => {
      if (hostname) {
        const available = await checkHostnameAvailability({
          hostname,
          userId: user.userId,
        });
        console.log("available", available);
        setIsHostnameAvailable(available);
      } else {
        setIsHostnameAvailable(null);
      }
    }, 1000),
    [checkHostnameAvailability, isCheckingHostname]
  );

  useEffect(() => {
    if (user.hostname) {
      setIsHostnameAvailable(true);
    }
  }, []);

  async function onSubmit(data: Omit<UserType, "_id" | "userId">) {
    if (currentStep === steps.length - 1) {
      setIsUpdating(true);
      await saveUser({
        userId: user.userId,
        ...data,
      });
      setIsUpdating(false);
    } else {
      setCurrentStep(currentStep + 1);
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100;

  return {
    data: {
      steps,
      form,
      progress,
      currentStep,
      isPending,
      isHostnameAvailable,
    },
    functions: {
      onSubmit,
      debouncedCheckHostname,
      subjectsOptions,
      handleUpgradeClick,
      setCurrentStep,
    },
  };
}
