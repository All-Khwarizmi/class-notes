"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/core/components/ui/form";
import { Cours } from "../../domain/entities/cours-schemas";
import { useForm } from "react-hook-form";
import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import { Input } from "@/core/components/ui/input";
import { useState } from "react";
import { Button } from "@/core/components/ui/button";
import CompetenceSelectorDialog from "./CompetenceSelectorDialog";
import useSaveCoursMetadata from "../../application/usecases/services/useSaveCoursMetadata";

export default function AddCoursForm({
  competences,
  userId,
}: {
  competences: Competence[];
  userId: string;
}) {
  const [selectedCompetences, setSelectedCompetences] = useState<Competence[]>(
    []
  );
  const { setSaveCoursMetadata } = useSaveCoursMetadata();
  const [open, setOpen] = useState(false);
  const form = useForm<
    Pick<Cours, "description" | "category" | "name" | "competences">
  >({
    defaultValues: {
      description: "",
      category: "",
      name: "",
      competences: [],
    },
  });

  function onSubmit(
    data: Pick<Cours, "description" | "category" | "name" | "competences">
  ) {
    const newData = {
      ...data,
      competences: selectedCompetences.map((c) => c._id),
    };
    setSaveCoursMetadata({
      cours: newData,
      userId: userId,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor={field.name}>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Cours name" />
                </FormControl>
                <FormDescription>Enter the name of the cours</FormDescription>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor={field.name}>Category</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Category" />
                </FormControl>
                <FormDescription>
                  Enter the category of the cours
                </FormDescription>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor={field.name}>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Description" />
                </FormControl>
                <FormDescription>
                  Enter the description of the cours
                </FormDescription>
              </FormItem>
            );
          }}
        />

        <CompetenceSelectorDialog
          competences={competences}
          selectedCompetences={selectedCompetences}
          setSelectedCompetences={setSelectedCompetences}
          open={open}
          setOpen={setOpen}
        />

        <Button
          onClick={(event) => {
            event.preventDefault();
            onSubmit(form.getValues());
          }}
          type="submit"
        >
          Next
        </Button>
      </form>
    </Form>
  );
}
