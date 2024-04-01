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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OnboardingForm() {
  const form = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      materia: "maths",
      name: "Pablo",
    },
  });
  function onSubmit(data: OnboardingType) {
    console.log(data);
  }
  return (
    <>
      <Form {...form}>
        <form
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
                  <Input {...field} />
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
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Valider</Button>
        </form>
      </Form>
    </>
  );
}
