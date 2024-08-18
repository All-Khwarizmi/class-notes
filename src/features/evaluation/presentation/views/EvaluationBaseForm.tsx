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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Switch } from "@/core/components/ui/switch";
import { toast } from "sonner";
import { EvaluationBaseType } from "../../domain/entities/evaluation-schema";
import { useEffect } from "react";
import CollapsibleCriteriaList from "../components/CollapsibleCriteriaList";
import GradeTypeSelectGroup from "../components/GradeTypeSelectGroup";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import useCreateEvaluationBaseFormLogic from "../hooks/useCreateEvaluationBaseFormLogic";
import { TypographyH1 } from "@/core/components/common/Typography";

export default function EvaluationBaseForm(props: {
  userId: string;
  evaluation?: EvaluationBaseType;
}) {
  const {
    form,
    criterias,
    setCriterias,
    openArray,
    setOpenArray,
    isPending,
    isUpdatePending,
    isSuccess,
    isUpdateSuccess,
    addCriteria,
    onSubmit,
  } = useCreateEvaluationBaseFormLogic(props);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Evaluation base created successfully!");
      form.reset();
    }
    if (isUpdateSuccess) {
      toast.success("Evaluation base updated successfully!");
    }
  }, [isSuccess, isUpdateSuccess]);
  return (
    <div className=" py-8 px-4  rounded-lg shadow-slate-800 shadow-inner">
      <header className="pb-12">
        <TypographyH1 text="Create an Evaluation" />
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex-1"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Evaluation name" {...field} />
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
                <FormLabel htmlFor={field.name}>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Evaluation description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gradeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Grade Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a grade type" />
                    </SelectTrigger>
                    <SelectContent>
                      <GradeTypeSelectGroup />
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Select the grade type for the evaluation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isGraded"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="flex flex-col gap-4">
                  <FormLabel htmlFor={field.name}>Is Graded</FormLabel>
                  <FormControl>
                    <Switch
                      onCheckedChange={field.onChange}
                      checked={field.value}
                    />
                  </FormControl>
                </div>
                <FormDescription>
                  Indicates if the evaluation is graded
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <CollapsibleCriteriaList
            criterias={criterias}
            openArray={openArray}
            setOpenArray={setOpenArray}
            setCriterias={setCriterias}
          />

          <div className="flex justify-end items-center space-x-4">
            {/* Button to add a new criteria */}
            <Button
              variant={"outline"}
              type="button"
              onClick={() => {
                addCriteria();
              }}
            >
              Add Criteria
            </Button>

            {isPending || isUpdatePending ? (
              <Loader className={cn("animate-spin", "text-blue-500")} />
            ) : (
              <Button disabled={isPending || isUpdatePending} type="submit">
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
