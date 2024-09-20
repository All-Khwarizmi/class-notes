"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/core/components/ui/form";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Textarea } from "@/core/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import { CoursSequenceForm } from "../views/AddCoursView";
import CompetenceSelectorAccordion from "./CompetenceSelectorAccordion";
import SelectImageUrl from "./SelectImageUrl";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
interface AddCoursOrSequenceFormProps {
  form: UseFormReturn<CoursSequenceForm>;
  competences: Competence[];
  selectedCompetences: Competence[];
  setSelectedCompetences: (params: {
    competence: Competence;
    remove?: boolean;
  }) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: CoursSequenceForm) => void;
  title: string;
  imageUrl?: string;
}

export default function AddCoursOrSequenceForm({
  form,
  competences,
  selectedCompetences,
  setSelectedCompetences,
  open,
  setOpen,
  onSubmit,
  title,
  imageUrl,
}: AddCoursOrSequenceFormProps) {
  const [localImageUrl, setLocalImageUrl] = useState<string>(
    imageUrl ?? "/images/mos-design-jzFbbG2WXv0-unsplash.jpg"
  );
  const router = useRouter();
  function goBack() {
    router.back();
  }
  return (
    <div className="container mx-auto py-6">
      <Button variant="ghost" onClick={goBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) =>
                onSubmit({
                  ...data,
                  competences: selectedCompetences.map((c) => c._id),
                  imageUrl: localImageUrl,
                })
              )}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Entrez le nom" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mots-clés</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="maths, algèbre, géométrie"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Entrez la description"
                        rows={4}
                      />
                    </FormControl>
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
                      Le type de contenu du cours ou de la séquence
                    </FormDescription>
                  </FormItem>
                )}
              />

              <CompetenceSelectorAccordion
                competences={competences}
                selectedCompetences={selectedCompetences}
                setSelectedCompetences={setSelectedCompetences}
                open={open}
                setOpen={setOpen}
              />

              <SelectImageUrl
                imageUrl={localImageUrl}
                setImageUrl={setLocalImageUrl}
              />

              <div className="flex justify-end">
                <Button type="submit">Soumettre</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
