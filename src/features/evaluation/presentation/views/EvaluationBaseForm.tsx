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
import { EvaluationBaseType } from "../../domain/entities/evaluation-schema";
import { useEffect, useMemo } from "react";
import CollapsibleCriteriaList from "../components/CollapsibleCriteriaList";
import GradeTypeSelectGroup from "../components/GradeTypeSelectGroup";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import useCreateEvaluationBaseFormLogic from "../hooks/useCreateEvaluationBaseFormLogic";
import { toastWrapper } from "@/core/utils/toast-wrapper";
import { useGetCompCat } from "@/features/comp-cat/application/adapters/services/useGetCompCat";
import { isLeft } from "fp-ts/lib/Either";
import CompetenceAccordionListModal from "@/features/comp-cat/presentation/components/CompetenceAccordionListModal";
import { groupCompetencesByCategory } from "@/features/comp-cat/domain/entities/schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card";

export default function EvaluationBaseForm({
  userId,
  evaluation,
}: {
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
  } = useCreateEvaluationBaseFormLogic({ userId, evaluation });

  const { data } = useGetCompCat({ userId });
  const { competences, categories } = useMemo(() => {
    if (!data || isLeft(data))
      return {
        competences: [],
        categories: [],
      };
    return {
      competences: groupCompetencesByCategory(data.right.competences),
      categories: data.right.categories,
    };
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toastWrapper.success("Evaluation created successfully!");
      form.reset();
    }
    if (isUpdateSuccess) {
      toastWrapper.success("Evaluation updated successfully!");
    }
  }, [isSuccess, isUpdateSuccess, form]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {evaluation ? "Update Evaluation" : "Create Evaluation"}
        </CardTitle>
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Evaluation description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <FormField
                control={form.control}
                name="gradeType"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-auto">
                    <FormLabel>Grade Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue placeholder="Select a grade type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <GradeTypeSelectGroup />
                      </SelectContent>
                    </Select>
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
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch
                        id="is-graded"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-0.5">
                      <FormLabel htmlFor="is-graded">Is Graded</FormLabel>
                      <FormDescription>
                        Indicates if the evaluation is graded
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <CollapsibleCriteriaList
              criterias={criterias}
              openArray={openArray}
              setOpenArray={setOpenArray}
              setCriterias={setCriterias}
            />

            <div className="flex flex-wrap justify-end items-center gap-4 pt-4">
              <CompetenceAccordionListModal
                competencesByCategory={competences}
                categories={categories}
                addCriteria={addCriteria}
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  addCriteria();
                }}
              >
                Add Criteria
              </Button>
              <Button disabled={isPending || isUpdatePending} type="submit">
                {isPending || isUpdatePending ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    {evaluation ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{evaluation ? "Update" : "Create"}</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
