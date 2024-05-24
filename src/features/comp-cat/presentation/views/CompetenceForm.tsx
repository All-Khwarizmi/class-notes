"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/core/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Category,
  Competence,
  competenceSchema,
} from "../../domain/entities/schemas";
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
import { useEffect, useState } from "react";
import useCreateCompetence from "../../application/usecases/services/useCreateCompetence";

export default function CompetenceForm({
  categories,
  userId,
}: {
  categories: Category[];
  userId: string;
}) {
  const [category, setCategory] = useState<string>(categories[0].name);
  const { setCreateCompetenceOptions } = useCreateCompetence();
  const form = useForm<Competence>({
    resolver: zodResolver(competenceSchema),
    defaultValues: {
      name: "",
      description: "",
      category: categories[0].name,
    },
  });

  function onSubmit(data: Competence) {
    console.log({ data });
    setCreateCompetenceOptions({
      competence: {
        ...data,
        createdBy: userId,
      },
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
                  <Input {...field} placeholder="React" />
                </FormControl>
                <FormDescription>
                  Enter the name of the competence
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
                  <Input
                    {...field}
                    placeholder="React is a JavaScript library for building user interfaces"
                  />
                </FormControl>
                <FormDescription>
                  Enter the description of the competence
                </FormDescription>
              </FormItem>
            );
          }}
        />

        <Select
          value={category}
          onValueChange={(value) => {
            form.setValue("category", value);
            setCategory(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={() => {
            onSubmit(form.getValues());
          }}
          type="submit"
          className="btn"
        >
          Add competence
        </Button>
      </form>
    </Form>
  );
}
