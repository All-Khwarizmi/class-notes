"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/core/components/ui/form";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Textarea } from "@/core/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import { CoursSequenceForm } from "../views/AddCoursView";
import CompetenceSelectorAccordion from "./CompetenceSelectorAccordion";
import SelectImageUrl from "./SelectImageUrl";

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

  return (
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
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter name" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="math, algebra, geometry" />
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
                      placeholder="Enter the description"
                      rows={4}
                    />
                  </FormControl>
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
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
