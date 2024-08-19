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
import { useEffect, useMemo, useState } from "react";
import useCreateCompetence from "../../application/usecases/services/useCreateCompetence";
import CustomDialog from "@/core/components/common/CustomDialog";
import CategoryForm from "../components/CategoryForm";
import { Check } from "lucide-react";
import { toastWrapper } from "@/core/utils/toast-wrapper";
import { useGetCategories } from "../../application/usecases/services/useGetCategories";
import { isRight } from "fp-ts/lib/Either";
import Header from "@/core/components/layout/Header";
import { HeaderTypographyH1 } from "@/core/components/common/Typography";

export default function CompetenceForm({ userId }: { userId: string }) {
  const { data: eitherCategories, refetch } = useGetCategories({ userId });
  const [category, setCategory] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { mutate: setCreateCompetenceOptions } = useCreateCompetence();
  const form = useForm<Competence>({
    resolver: zodResolver(competenceSchema),
    defaultValues: {
      name: "",
      description: "",
      category,
    },
  });

  useEffect(() => {
    if (
      eitherCategories &&
      isRight(eitherCategories) &&
      eitherCategories.right.length > 0
    ) {
      setCategory(eitherCategories.right[0].name);
      form.setValue("category", category);
    }
  }, [eitherCategories]);
  const categories = useMemo(() => {
    if (!eitherCategories || !isRight(eitherCategories)) return [];
    return eitherCategories.right;
  }, [eitherCategories]);

  function onSubmit(data: Competence) {
    if (data.name === "" || data.description === "") {
      return toastWrapper.info("Please fill all fields");
    }

    setCreateCompetenceOptions(
      {
        category: data.category,
        createdBy: userId,
        description: data.description,
        name: data.name,
      },
      {
        onSuccess: () => {},
      }
    );
  }
  if (!eitherCategories || !isRight(eitherCategories)) return null;
  return (
    <div className="px-8 rounded-lg bg-slate-900 py-12 shadow-md shadow-slate-800">
      <HeaderTypographyH1 text="Create Competence" className="pt-0" />
      <Form {...form}>
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
                  <CategoryForm userId={userId} refetch={() => refetch()} />
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
