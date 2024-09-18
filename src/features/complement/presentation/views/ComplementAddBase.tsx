"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/core/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/core/components/ui/form";
import { Input } from "@/core/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Switch } from "@/core/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import useAddRessource from "../../application/adapters/services/useAddRessource";
import { toastWrapper } from "@/core/utils/toast-wrapper";

const ComplementBaseSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  description: z.string().optional(),
  publish: z.boolean().optional(),
  type: z.enum(["Lesson", "Exercise", "Additional"]).default("Lesson"),
  contentType: z.enum(["Embed", "Diagram", "Markup"]).default("Markup"),
});

type ComplementBaseType = z.infer<typeof ComplementBaseSchema>;

interface ComplementAddBaseFormProps {
  slug: string;
}

function ComplementAddBaseForm({ slug }: ComplementAddBaseFormProps) {
  const { mutate: setComplementBaseOptions, isPending } = useAddRessource();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ComplementBaseType>({
    resolver: zodResolver(ComplementBaseSchema),
    defaultValues: {
      name: "",
      description: "",
      publish: false,
      type: "Lesson",
      contentType: "Markup",
    },
  });

  function onSubmit(values: ComplementBaseType) {
    setIsSubmitting(true);
    setComplementBaseOptions(
      {
        complement: {
          coursId: slug,
          complementBaseOptions: values,
        },
        coursId: slug,
      },
      {
        onSuccess: () => {
          toastWrapper.success("Ressource ajoutée", { duration: 1000 });
        },
        onError: () => {
          toastWrapper.error("Erreur lors de l'ajout de la ressource", {
            duration: 1000,
          });
        },
      }
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Ajouter une ressource</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de la ressource" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Description de la ressource"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Lesson">Leçon</SelectItem>
                          <SelectItem value="Exercise">Exercice</SelectItem>
                          <SelectItem value="Additional">
                            Supplémentaire
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>Le type de la ressource</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de contenu</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type de contenu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Markup">Texte enrichi</SelectItem>
                          <SelectItem value="Diagram">Diagramme</SelectItem>
                          <SelectItem value="Embed">Embed</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Le type de contenu de la ressource
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="publish"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Publier</FormLabel>
                    <FormDescription>
                      Rendre la ressource visible pour les étudiants
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Ajout en cours..." : "Ajouter la ressource"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ComplementAddBaseForm;
