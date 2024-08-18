import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/core/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, categorySchema } from "../../domain/entities/schemas";
import { useForm } from "react-hook-form";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import useCreateCategory from "../../application/usecases/services/useCreateCategory";

export default function CategoryForm({
  userId,
  refetch,
}: {
  userId: string;
  refetch: () => Promise<any>;
}) {
  const { mutate: setCreateCategoryOptions } = useCreateCategory();
  const form = useForm<Pick<Category, "name" | "description">>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(data: Pick<Category, "name" | "description">) {
    setCreateCategoryOptions(
      {
        ...data,
        createdBy: userId,
      },
      {
        onSuccess: async () => {
          await refetch();
        },
      }
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Enter the name of the category</FormDescription>
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
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the description of the category
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            onClick={() => {
              onSubmit(form.getValues());
            }}
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
