"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import classSchema from "@/utils/class-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClassType } from "@/utils/class-schema";
import { useForm } from "react-hook-form";
import { Textarea } from "../../components/ui/textarea";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
const BASE_IMAGE_URL = "https://source.unsplash.com/random/800x600";
export default function AddClassForm() {
  const addClass = useMutation(api.classes.createClass);
  const form = useForm<ClassType>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      description: `${new Date().getFullYear()} - ${
        new Date().getFullYear() + 1
      }`,
      imageUrl: BASE_IMAGE_URL,
      students: [],
    },
  });

  async function onSubmit(values: ClassType) {
    console.log(values);
    const id = await addClass(values);
    if (id) {
      form.reset();
      toast.success("Classe ajoutée avec succès");
    } else toast.error("Erreur lors de l'ajout de la classe");
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
                  <Input placeholder="2de 8" {...field} />
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
                  <Textarea placeholder="Description" {...field} />
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
                  <Input placeholder="URL" {...field} />
                </FormControl>
                <FormDescription>
                  L&apos;URL de l&apos;image de la classe
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button className="mt-8" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
