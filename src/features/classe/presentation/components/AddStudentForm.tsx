import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Student, StudentSchema } from "./student-schema";
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
import useAddStudent from "../../application/adapters/services/useAddStudent";
export default function AddStudentForm({
  classId,
  refetch,
}: {
  classId: Id<"Classes">;
  refetch: () => void;
}) {
  const { mutate: addStudent } = useAddStudent();

  const form = useForm<Student>({
    resolver: zodResolver(StudentSchema),
    defaultValues: {
      name: "",
      classId,
    },
  });
  async function onSubmit(values: Student) {
    console.log(values);
    const { name } = values;
    addStudent(
      { name, classId },
      {
        onSuccess: () => {
          refetch();
          toast.success("Élève ajouté avec succès");
        },
        onError: () => {
          toast.error("Erreur lors de l'ajout de l'élève");
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
                  <Input placeholder="Jean Dupont" {...field} />
                </FormControl>
                <FormDescription>Le nom de l&apos;élève</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="py-2 flex justify-end">
            {" "}
            <Button
              onClick={async () => {
                const values = form.getValues();
                const { name } = values;
                addStudent(
                  { name, classId },
                  {
                    onSuccess: () => {
                      refetch();
                      toast.success("Élève ajouté avec succès");
                    },
                    onError: () => {
                      toast.error("Erreur lors de l'ajout de l'élève");
                    },
                  }
                );
              }}
              className="btn"
            >
              Ajouter l&apos;élève
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
