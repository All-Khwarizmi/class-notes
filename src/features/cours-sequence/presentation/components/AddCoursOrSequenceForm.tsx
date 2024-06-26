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
import CompetenceSelectorDialog from "./CompetenceSelectorDialog";
import { UseFormReturn } from "react-hook-form";
import { CoursSequenceForm } from "../views/AddCoursView";
import SelectImageUrl from "./SelectImageUrl";
import { useState } from "react";
import { Switch } from "@/core/components/ui/switch";

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
    <>
      <h1 className="text-2xl font-bold pb-4 ">{title}</h1>
      <Form {...form}>
        <form className="space-y-4">
          <div className="flex justify-between items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={`Name `} />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            {/* Add a switch to controll visibility */}
            <FormField
              control={form.control}
              name="publish"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col gap-2  justify-center">
                    <FormLabel htmlFor={field.name}>Publish</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Category</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`keywords separated by commas: "math, algebra, geometry"
                    `}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter some keywords to help categorize
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
                    <Input {...field} placeholder="Enter the description" />
                  </FormControl>
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

          <SelectImageUrl
            imageUrl={localImageUrl}
            setImageUrl={setLocalImageUrl}
          />

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
            Next
          </Button>
        </form>
      </Form>
    </>
  );
}
