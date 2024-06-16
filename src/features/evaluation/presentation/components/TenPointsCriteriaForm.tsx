import React from "react";
import {
  StudentGradeTenPointsExtension,
  StudentGradeTenPointsSchemaExtension,
} from "../../application/adapters/utils/ten-points-scale-case";
import { EvaluationBaseType } from "../../domain/entities/evaluation-schema";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/core/components/ui/form";
import {
  StudentGradeType,
  StudentGradeSchema,
} from "../../domain/entities/evaluation-with-grades-schema";
import useUpdateGrade from "../../application/adapters/services/useUpdateGrade";
import { UpdateGradeOptions } from "../../domain/entities/evaluation-types";

function TenPointsCriteriaForm(props: {
  studentGrade: StudentGradeTenPointsExtension;
  evaluationBase: EvaluationBaseType;
  evaluationId: string;
}) {
  const {
    isSuccess,
    isError,
    error,
    isPending,
    mutate: updateGrade,
  } = useUpdateGrade();
  const form = useForm<StudentGradeTenPointsExtension>({
    resolver: zodResolver(StudentGradeTenPointsSchemaExtension),
    defaultValues: props.studentGrade,
  });

  function onSubmit(data: StudentGradeTenPointsExtension) {
    const grade: UpdateGradeOptions = {
      ...data,
      studentId: props.studentGrade.studentId,
      evaluationId: props.evaluationId,
      grades: data.grades,
    };
    updateGrade(grade);
  }
  function handleSubmit() {
    return form.handleSubmit((data) => {
      onSubmit(data);
    });
  }
  return (
    <div className="space-y-8 py-8 px-4 md:px-0 rounded-lg shadow-md">
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full max-w-lg mx-auto"
        >
          {/* Feedback */}
          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Feedback</FormLabel>
                <FormControl>
                  <Input placeholder="Feedback for the student" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Criteria Grades */}
          {props.studentGrade.grades.map((grade, index) => {
            const criteria = props.evaluationBase.criterias.find(
              (c) => c.id === grade.criteriaId
            );
            const maxGrade = criteria?.weight ?? 1;
            return (
              <Controller
                key={grade.criteriaId}
                name={`grades.${index}.grade`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>
                      {criteria
                        ? `${criteria.name}: ${criteria.description}`
                        : `Criterion: ${grade.criteriaId}`}
                    </FormLabel>
                    <FormDescription>
                      {`Max grade: ${maxGrade}`}
                    </FormDescription>
                    <FormControl>
                      <Input
                        max={maxGrade}
                        placeholder={`Enter grade for ${
                          criteria ? criteria.name : grade.criteriaId
                        }`}
                        {...field}
                        type={"number"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}

          <div className="flex justify-between items-center space-x-4">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default TenPointsCriteriaForm;
