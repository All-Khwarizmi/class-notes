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
import CustomDialog from "@/core/components/common/CustomDialog";
import CategoryForm from "../components/CategoryForm";
import { Check } from "lucide-react";

export default function CompetenceForm({
  categories,
  userId,
}: {
  categories: Category[];
  userId: string;
}) {
  const [category, setCategory] = useState<string>(
    categories.length > 0 ? categories[0].name : ""
  );
  const [open, setOpen] = useState(false);
  const { setCreateCompetenceOptions } = useCreateCompetence();
  const form = useForm<Competence>({
    resolver: zodResolver(competenceSchema),
    defaultValues: {
      name: "",
      description: "",
      category: categories.length > 0 ? categories[0].name : "",
    },
  });

  function onSubmit(data: Competence) {
    setCreateCompetenceOptions({
      competence: {
        ...data,
        createdBy: userId,
      },
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto  shadow-slate-800 shadow-inner rounded-md p-4">
      <Form {...form}>
        <h1 className="text-3xl font-semibold py-8">Add new competence</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
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
                </FormItem>
              );
            }}
          />
          <div className="flex justify-between pt-4">
            <div className="space-y-1">
              <div className="flex gap-2">
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
                <CustomDialog
                  open={open}
                  setOpen={setOpen}
                  title="Add new category"
                >
                  <CategoryForm userId={userId} />
                </CustomDialog>
              </div>
              <FormDescription>
                Select the category of the competence
              </FormDescription>
            </div>
            <Button
              variant={"outline"}
              onClick={() => {
                onSubmit(form.getValues());
              }}
              type="submit"
              className="btn"
            >
              <Check className="text-green-500" size={20} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
