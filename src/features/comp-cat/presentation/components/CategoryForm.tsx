"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, categorySchema } from "../../domain/entities/schemas";
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
import { Textarea } from "@/core/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Loader2 } from "lucide-react";
import useCreateCategory from "../../application/usecases/services/useCreateCategory";
import { toastWrapper } from "@/core/utils/toast-wrapper";

interface CategoryFormProps {
  userId: string;
  refetch: () => Promise<any>;
}

export default function CategoryForm({ userId, refetch }: CategoryFormProps) {
  const { mutate: createCategory, isPending } = useCreateCategory();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<Pick<Category, "name" | "description">>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(data: Pick<Category, "name" | "description">) {
    setIsSubmitting(true);
    createCategory(
      {
        ...data,
        createdBy: userId,
      },
      {
        onSuccess: async () => {
          await refetch();
          toastWrapper.success("Category created");
          form.reset();
        },
        onError: () => {
          toastWrapper.error(
            "There was an error creating the category. Please try again."
          );
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Category</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter category name" />
                  </FormControl>
                  <FormDescription>
                    Provide a name for the new category
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter category description"
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of the category
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isSubmitting || isPending}
              className="w-full"
            >
              {isSubmitting || isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Category"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
