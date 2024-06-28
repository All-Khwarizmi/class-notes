import React from "react";

import { EvaluationBaseType } from "../../domain/entities/evaluation-schema";
import { useForm } from "react-hook-form";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import useUpdateGrade from "../../application/adapters/services/useUpdateGrade";
import { UpdateGradeOptions } from "../../domain/entities/evaluation-types";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import {
  CompetenceLevel,
  StudentGradeCompetenceExtension,
  StudentGradeCompetenceSchemaExtension,
} from "../../application/adapters/utils/competence-case";

function CompetenceCriteriaForm(props: {
  studentGrade: StudentGradeCompetenceExtension;
  evaluationBase: EvaluationBaseType;
  evaluationId: string;
  classeId: string;
  studentName: string;
  refetch: () => void;
  setIsDialogOpen: (open: boolean) => void;
}) {
  const { isPending, mutate: updateGrade } = useUpdateGrade();
  const form = useForm<StudentGradeCompetenceExtension>({
    resolver: zodResolver(StudentGradeCompetenceSchemaExtension),
    defaultValues: props.studentGrade,
  });

  function onSubmit(data: StudentGradeCompetenceExtension) {
    const grade: UpdateGradeOptions = {
      ...data,
      studentId: props.studentGrade.studentId,
      evaluationId: props.evaluationId,
      grades: data.grades,
    };
    updateGrade(
      {
        options: grade,
        classeId: props.classeId,
      },
      {
        onSuccess: () => {
          props.refetch();
          props.setIsDialogOpen(false);
          toast.success("Grade updated successfully");
        },
      }
    );
  }

  return (
    <div className="space-y-8 py-8 px-4 md:px-0 rounded-lg shadow-md">
      <h2 className="text-2xl text-center font-bold">
        {props.studentName}&apos;s Grade
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            onSubmit(data);
          })}
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
            // Find the criteria for the grade. There's a possibility that the criteria might have been deleted. So we default the weight to 1.
            const criteria = props.evaluationBase.criterias.find(
              (criteria) => criteria.id === grade.criteriaId
            );
            return (
              <div key={index}>
                <FormField
                  control={form.control}
                  name={`grades.${index}.grade`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={field.name}>
                        {criteria
                          ? `${criteria.name}: ${criteria.description}`
                          : `Criterion: ${grade.criteriaId}`}
                      </FormLabel>
                      <FormDescription>
                        {/* Explain the type of input and the wheight of the criteria in the evaluation */}
                        {criteria
                          ? `Weight: ${criteria.weight}`
                          : `Grade: ${grade.grade}`}
                      </FormDescription>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            function fromNumberToCompetenceGrade(
                              value: string
                            ): CompetenceLevel {
                              switch (value) {
                                case "1":
                                  return "To be acquired";
                                case "2":
                                  return "To be developed";
                                case "3":
                                  return "Proficiency";
                                case "4":
                                  return "Expertise";
                                default:
                                  return "To be acquired";
                              }
                            }

                            form.setValue(
                              `grades.${index}.grade`,
                              fromNumberToCompetenceGrade(value)
                            );
                            return value;
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a degree of competence ">
                              {field.value}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {[1, 2, 3, 4].map((value) => (
                                <SelectItem key={value} value={String(value)}>
                                  <SelectLabel>{value}</SelectLabel>
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          })}
          <div className="flex justify-between items-center space-x-4">
            {isPending ? (
              <Loader size={24} color="white" className="animate-spin" />
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CompetenceCriteriaForm;
