"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { isRight } from "fp-ts/lib/Either";
import { Check, Plus } from "lucide-react";
import { Competence, competenceSchema } from "../../domain/entities/schemas";
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
import { Button } from "@/core/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Textarea } from "@/core/components/ui/textarea";
import useCreateCompetence from "../../application/usecases/services/useCreateCompetence";
import CategoryForm from "../components/CategoryForm";
import { toastWrapper } from "@/core/utils/toast-wrapper";
import { useGetCategories } from "../../application/usecases/services/useGetCategories";

export default function CompetenceForm({ userId }: { userId: string }) {
  const { data: eitherCategories, refetch } = useGetCategories({ userId });
  const [category, setCategory] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { mutate: createCompetence, isPending } = useCreateCompetence();

  const form = useForm<Competence>({
    resolver: zodResolver(competenceSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
    },
  });

  const categories = useMemo(() => {
    if (!eitherCategories || !isRight(eitherCategories)) return [];
    return eitherCategories.right;
  }, [eitherCategories]);

  useEffect(() => {
    if (categories.length > 0) {
      setCategory(categories[0].name);
      form.setValue("category", categories[0].name);
    }
  }, [categories, form]);

  function onSubmit(data: Competence) {
    if (data.name === "" || data.description === "" || data.category === "") {
      return toastWrapper.error("Please fill all fields");
    }

    createCompetence(
      {
        category: data.category,
        createdBy: userId,
        description: data.description,
        name: data.name,
      },
      {
        onSuccess: () => {
          toastWrapper.success("Competence created successfully");
          form.reset();
        },
        onError: () => {
          toastWrapper.error("Failed to create competence");
        },
      }
    );
  }

  if (!eitherCategories || !isRight(eitherCategories)) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Competence</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., React" />
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
                    <Textarea
                      {...field}
                      placeholder="e.g., React is a JavaScript library for building user interfaces"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <div className="flex items-center space-x-2">
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setCategory(value);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {categories.map((category) => (
                            <SelectItem
                              key={category._id}
                              value={category.name}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add new category</DialogTitle>
                          <DialogDescription>
                            Create a new category for competences
                          </DialogDescription>
                        </DialogHeader>
                        <CategoryForm
                          userId={userId}
                          refetch={async () => {
                            await refetch();
                            setOpen(false);
                          }}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <FormDescription>
                    Select the category of the competence
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>Creating...</>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" /> Create Competence
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
