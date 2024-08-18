"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/core/components/ui/form";
import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import CompetenceSelectorAccordion from "./CompetenceSelectorAccordion";
import { UseFormReturn } from "react-hook-form";
import { CoursSequenceForm } from "../views/AddCoursView";
import SelectImageUrl from "./SelectImageUrl";
import { useState } from "react";
import {
  HeaderTypographyH1,
  TypographyH1,
} from "@/core/components/common/Typography";

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
}: {
  imageUrl?: string;

  form: UseFormReturn<CoursSequenceForm, any, undefined>;
  open: boolean;
  competences: Competence[];
  selectedCompetences: Competence[];
  setSelectedCompetences: ({
    competence,
    remove,
  }: {
    competence: Competence;
    remove?: boolean;
  }) => void;
  setOpen: (open: boolean) => void;
  onSubmit: (data: CoursSequenceForm) => void;
  title: string;
}) {
  const [localImageUrl, setLocalImageUrl] = useState<string>(
    imageUrl ?? "/images/mos-design-jzFbbG2WXv0-unsplash.jpg"
  );

  return (
    <div className="px-4 ">
      <HeaderTypographyH1 text={title} />
      <Form {...form}>
        <form className="space-y-4">
          <div className="flex gap-8 items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor={field.name}>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={`Name `} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => {
                return (
                  <FormItem className="flex-1">
                    <FormLabel htmlFor={field.name}>Keywords</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={`Separated by commas: "math, algebra, geometry"
                    `}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter the description" />
                  </FormControl>
                </FormItem>
              );
            }}
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

          <section className="flex justify-end">
            <Button
              onClick={(event) => {
                event.preventDefault();

                onSubmit({
                  ...form.getValues(),
                  competences: selectedCompetences.map((c) => c._id),
                  imageUrl: localImageUrl,
                });
              }}
              type="submit"
            >
              Submit
            </Button>
          </section>
        </form>
      </Form>
    </div>
  );
}
