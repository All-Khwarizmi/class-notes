"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../../../../core/components/ui/textarea";
import classSchema, { ClassType } from "@/features/classe/domain/class-schema";
const BASE_IMAGE_URL = "https://source.unsplash.com/random/800x600";
import { useEffect } from "react";
import { classeRepository } from "@/features/classe/application/repository/classe-repository";
import useAddClasse from "../../application/adapters/services/useAddClasse";

export default function AddClassForm(props: {
  setOpen: (value: boolean) => void;
  userId: string;
}) {
  const { mutate: setClasse } = useAddClasse();
  const form = useForm<Pick<ClassType, "description" | "name" | "imageUrl">>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      description: `${new Date().getFullYear()} - ${
        new Date().getFullYear() + 1
      }`,
      imageUrl: BASE_IMAGE_URL,
    },
  });

  async function onSubmit(
    values: Pick<ClassType, "description" | "name" | "imageUrl">
  ) {
    const {} = values;
    setClasse(
      {
        ...values,
        userId: props.userId,
      },
      {
        onSuccess: () => {
          props.setOpen(false);
          window.location.reload();
        },
      }
    );
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Nom</FormLabel>
                <FormControl>
                  <Input
                    data-testid="class-name-input"
                    placeholder="2de 8"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Le nom de la classe</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="py-2"></div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Description</FormLabel>
                <FormControl>
                  <Textarea
                    data-testid="class-description-input"
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormDescription>La description de la classe</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="py-2"></div>

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Image</FormLabel>
                <FormControl>
                  <Input
                    data-testid="class-image-url-input"
                    placeholder="URL"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  L&apos;URL de l&apos;image de la classe
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              onClick={() => {
                const values = form.getValues();
                form.setValue("imageUrl", BASE_IMAGE_URL);
                onSubmit(values);
              }}
              data-testid="submit-class"
              className="mt-8"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
