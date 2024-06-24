import { Id } from "../../../../../convex/_generated/dataModel";
import { Student, StudentSchema } from "../../domain/entities/student-schema";
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
import { useState } from "react";
import SelectImageUrl from "@/features/cours-sequence/presentation/components/SelectImageUrl";

function StudentUpdateForm(props: { student: Student; classeId: string }) {
  const { student, classeId } = props;

  const [localImageUrl, setLocalImageUrl] = useState<string>(
    student.imageUrl ?? "/images/mos-design-jzFbbG2WXv0-unsplash.jpg"
  );
  // const { mutate: updateStudent } = useUpdateStudent();
  const form = useForm<Pick<Student, "name" | "classId" | "imageUrl">>({
    resolver: zodResolver(StudentSchema),
    defaultValues: student,
  });

  async function onSubmit(
    values: Pick<Student, "name" | "classId" | "imageUrl">
  ) {
    console.log(values);
    const { name } = values;
    // updateStudent(
    //   { name, classId },
    //   {
    //     onSuccess: () => {
    //       refetch();
    //       toast.success("Élève ajouté avec succès");
    //     },
    //     onError: () => {
    //       toast.error("Erreur lors de l'ajout de l'élève");
    //     },
    //   }
    // );
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
                    data-testid="student-name-input"
                    placeholder="Nom de l'élève"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <SelectImageUrl
            imageUrl={localImageUrl}
            setImageUrl={setLocalImageUrl}
          />
          <FormDescription>
            <FormMessage>
              <Button type="submit">Mettre à jour</Button>
            </FormMessage>
          </FormDescription>
        </form>
      </Form>
    </>
  );
}

export default StudentUpdateForm;
