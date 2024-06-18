"use client";

import { useState, useEffect } from "react";
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
  StudentGradeSchema,
  StudentGradeType,
} from "@/features/evaluation/domain/entities/evaluation-with-grades-schema";
import { EvaluationBaseType } from "@/features/evaluation/domain/entities/evaluation-schema";
import TenPointsCriteriaForm from "@/features/evaluation/presentation/components/TenPointsCriteriaForm";
import { StudentGradeTenPointsSchemaExtension } from "@/features/evaluation/application/adapters/utils/ten-points-scale-case";
import useGetEvaluationCompoundList from "@/features/evaluation/application/adapters/services/useGetEvaluationCompoundList";
import { CompoundEvaluationType } from "../../domain/class-schema";
import { isLeft } from "fp-ts/lib/Either";
import { toast } from "sonner";

export default function UpdateStudentGradeForm(props: {
  studentGrade: StudentGradeType;
  evaluationBase: EvaluationBaseType;
  evaluationId: string;
  classeId: string;
  setIsDialogOpen: (open: boolean) => void;
  setLocalTableData: (data: CompoundEvaluationType[]) => void;
}) {
  const form = useForm<StudentGradeType>({
    resolver: zodResolver(StudentGradeSchema),
    defaultValues: props.studentGrade,
  });
  const [shouldFetchCompoundList, setShouldFetchCompoundList] = useState(false);
  const { data: compoundList, isSuccess } = useGetEvaluationCompoundList({
    classeId: props.classeId,
    enabled: shouldFetchCompoundList,
  });

  useEffect(() => {
    // Check that the evaluation base criterias are the same as the student grade criterias
    let toastId: string | number;
    const criterias = props.evaluationBase.criterias.map(
      (criteria) => criteria.id
    );
    const studentCriterias = props.studentGrade.grades.map(
      (grade) => grade.criteriaId
    );
    const missingCriterias = studentCriterias.filter(
      (criteria) => !criterias.includes(criteria)
    );
    const missingCriteriasBase = criterias.filter(
      (criteria) => !studentCriterias.includes(criteria)
    );
    if (missingCriterias.length > 0 || missingCriteriasBase.length > 0) {
      toastId = toast.error("Criterias do not match the evaluation", {
        description: `
        If you have added new criterias to the evaluation, those criterias will not be added to the student grade.
        To update the student grade, please remove the evaluation and assign it again.

       ${
         missingCriterias.length > 0
           ? `Missing student criterias: ${missingCriterias.length}`
           : ""
       }
        ${
          missingCriteriasBase.length > 0
            ? `Missing evaluation criterias: ${missingCriteriasBase.length}`
            : ""
        }
        `,
      });
    }

    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, []);

  useEffect(() => {
    if (compoundList) {
      if (isLeft(compoundList)) {
        console.error("Error fetching compound list", compoundList.left);
        return;
      }
      props.setLocalTableData(compoundList.right);
      props.setIsDialogOpen(!shouldFetchCompoundList);
    }
  }, [compoundList, isSuccess]);

  useEffect(() => {
    form.reset(props.studentGrade);
  }, [props.studentGrade]);

  function onSubmit(data: StudentGradeType) {
    const grade = {
      ...data,
      studentId: props.studentGrade.studentId,
      grades: data.grades.map((g) => ({
        ...g,
        grade: typeof g.grade === "string" ? parseFloat(g.grade) : g.grade,
      })),
    };
  }

  function handleSubmit() {
    return form.handleSubmit((data) => {
      onSubmit(data);
    });
  }

  if (props.evaluationBase.gradeType.type === "10-point Scale") {
    const studentGrade = StudentGradeTenPointsSchemaExtension.safeParse(
      props.studentGrade
    );
    if (!studentGrade.success) {
      return <div>Invalid student grade</div>;
    }
    return (
      <TenPointsCriteriaForm
        studentGrade={studentGrade.data}
        evaluationBase={props.evaluationBase}
        evaluationId={props.evaluationId}
        classeId={props.classeId}
        setShouldFetchCompoundList={() => setShouldFetchCompoundList(true)}
      />
    );
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
                      Please enter a{" "}
                      {props.studentGrade.grades[index].gradeType.type} grade.
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder={`Enter grade for ${
                          criteria ? criteria.name : grade.criteriaId
                        }`}
                        {...field}
                        type={
                          typeof grade.grade === "number" ? "number" : "text"
                        }
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
