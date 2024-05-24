"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OnboardingType, onboardingSchema } from "./onboarding-schema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/core/components/ui/form";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { userRepositry } from "@/features/user/application/repository/user-repository";
import { toast } from "sonner";
import { useEffect } from "react";
import oldAuthRepositoy from "@/features/auth/application/repository/old-auth-repository";

export default function OnboardingForm() {
 const {authUserId} = oldAuthRepositoy.useGetUserId()
  const { user, error, setOnBoardingData } = userRepositry.useOnboardUser();
  const form = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      materia: "",
      name: "",
    },
  });
  useEffect(() => {
    if (user) {
      toast.success(`
        Bienvenue ${form.getValues(
          "name"
        )}, vous êtes désormais inscrit sur la plateforme !`);
      form.reset();
    }
    if (error) {
      toast.error(
        `${form.getValues(
          "name"
        )}, une erreur est survenue lors de l'enregistrement de vos informations. Mais pas de panique, vous pouvez réessayer !`
      );
    }
  }, [user, error]);
  function onSubmit(data: OnboardingType) {
    if (!authUserId) {
      toast.error(
        "Une erreur est survenue lors de la récupération de votre identifiant"
      );
      return;
    }
    setOnBoardingData({
      userId: authUserId || "",
      schoolSubject: data.materia,
      name: data.name,
    });
  }
  return (
    <>
      <Form {...form}>
        <form
          data-testid="onboarding-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="materia"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>
                  Quelle matière enseignez-vous ?
                </FormLabel>
                <FormControl>
                  <Input {...field} data-testid="matiere-input" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>
                  Par quel nom souhaitez-vous être appelé ?
                </FormLabel>
                <FormControl>
                  <Input {...field} data-testid="name-input" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button data-testid="submit-onboarding-form" type="submit">Valider</Button>
        </form>
      </Form>
    </>
  );
}
