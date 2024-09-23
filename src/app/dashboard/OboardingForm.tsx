"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  CalendarDaysIcon,
  CoinsIcon,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  UserType,
  userSchema,
} from "@/features/user/domain/entities/user-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/core/components/ui/form";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Separator } from "@/core/components/ui/separator";
import { Progress } from "@/core/components/ui/progress";
import { countryOptions } from "@/features/user/domain/entities/user-schema";
import { getEducationSystemOptions } from "@/features/user/domain/entities/education-systems/global";
import { educationSystemOptions } from "@/features/user/domain/entities/education-systems/education-system";

import { debounce } from "lodash";
import { z } from "zod";
import useSaveUser from "@/features/profile/application/adapters/services/useSaveUser";
import { checkUserCredits } from "@/features/profile/presentation/helpers/helpers";
import { useUpgradeSubscription } from "@/features/profile/presentation/helpers/useUpgradeSubscription";
import { api } from "../../../convex/_generated/api";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/core/query/ query-keys";
import { hostname } from "os";

const steps = [
  { id: "personal", title: "Informations personnelles" },
  { id: "education", title: "Détails de l'éducation" },
  { id: "subscription", title: "Abonnement" },
  { id: "complete", title: "Terminer" },
];

// Simulated API call for hostname availability check
const useCheckHostnameAvailabilityQuery = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.HOSTNAME.IS_AVAILABLE()],
    mutationFn: ({ hostname, userId }: { hostname: string; userId: string }) =>
      fetchMutation(api.hostname.isHostnameAvailableClient, {
        hostname,
        userId,
      }),
  });
};

const useCheckHostnameAvailability = () => {
  const { isPending, mutateAsync: checkHostnameAvailability } =
    useCheckHostnameAvailabilityQuery();
  return {
    isLoading: isPending,
    checkHostnameAvailability,
  };
};

export default function OnboardingProcess({ user }: { user: UserType }) {
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
      router.push("/dashboard");
    } else {
      setCurrentStep(currentStep + 1);
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Bienvenue sur La Classe</CardTitle>
          <UserButton />
        </div>
        <CardDescription>
          Configurons votre profil en quelques étapes simples
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Progress value={progress} className="w-full" />

        <div className="flex justify-between text-sm text-muted-foreground">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={index <= currentStep ? "text-primary" : ""}
            >
              {step.title}
            </div>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {currentStep === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Jean Dupont"
                          data-testid="name-input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pays</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un pays" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {countryOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hostname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom d&apos;hôte</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="mon-ecole"
                            data-testid="hostname-input"
                            onChange={(e) => {
                              field.onChange(e);
                              debouncedCheckHostname(e.target.value);
                            }}
                          />
                        </FormControl>
                        {field.value && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            {isHostnameAvailable === true && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            {isHostnameAvailable === false && (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {currentStep === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="educationSystem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Système éducatif</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez votre système éducatif" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {educationSystemOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="schoolSubject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matière</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez vos matières" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {subjectsOptions?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Expiration de l&apos;abonnement
                      </h3>
                      <p className="text-2xl font-semibold flex items-center">
                        <CalendarDaysIcon className="w-5 h-5 mr-2" />
                        {user.endsOn
                          ? new Date(user.endsOn).toLocaleDateString("fr-FR")
                          : "Pas d'abonnement"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Crédits restants
                      </h3>
                      <p className="text-2xl font-semibold flex items-center">
                        <CoinsIcon className="w-5 h-5 mr-2" />
                        {checkUserCredits(user.endsOn, user.credits)}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {!user.subscriptionId && (
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={handleUpgradeClick}
                      data-testid="pay-subcription-btn"
                    >
                      Mettre à niveau maintenant
                    </Button>
                  )}
                </div>
              </>
            )}

            {currentStep === 3 && (
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Tout est prêt !</h2>
                <p>
                  Votre profil est maintenant complet. Vous êtes prêt à
                  commencer à utiliser La Classe.
                </p>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {currentStep > 0 && (
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={isPending}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour
          </Button>
        )}
        {currentStep < steps.length - 1 ? (
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
            data-testid="next-step-btn"
          >
            {isPending ? "Mise à jour..." : "Suivant"}{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
            data-testid="complete-onboarding-btn"
          >
            Terminer l&apos;inscription
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
