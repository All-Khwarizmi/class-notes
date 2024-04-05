import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Student, studentSchema } from "./student-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { toast } from "sonner";

export default function AddStudentForm({
  classId,
}: {
  classId: Id<"Classes">;
}) {
  const addStudent = useMutation(api.students.createStudent);
  const form = useForm<Student>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      classId,
    },
  });
  async function onSubmit(values: Student) {
    console.log(values);
    const { name } = values;
    const id = await addStudent({ name, classId });
    if (id) {
      form.reset();
      toast.success("Élève ajouté avec succès");
    } else toast.error("Erreur lors de l'ajout de l'élève");
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
                  <Input placeholder="Jean Dupont" {...field} />
                </FormControl>
                <FormDescription>Le nom de l&apos;élève</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="py-2 flex justify-end">
            {" "}
            <Button type="submit" className="btn">
              Ajouter l&apos;élève
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
