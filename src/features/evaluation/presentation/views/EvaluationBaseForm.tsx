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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  EvaluationBaseType,
  EvaluationBaseTypeForm,
  EvaluationBaseTypeFormSchema,
  EvaluationCriteriaType,
  GradeTypeUnionType,
} from "../../domain/entities/evaluation-schema";
import { useEffect, useState } from "react";
import useCreateBaseEvaluation from "../../application/adapters/services/useCreateBaseEvaluation";
import { getGradeTypeByName } from "../../application/adapters/utils/grade-helpers";
import useUpdateBaseEvaluation from "../../application/adapters/services/useUpdateBaseEvaluation";
import CollapsibleCriteriaList from "../components/CollapsibleCriteriaList";
import GradeTypeSelectGroup from "../components/GradeTypeSelectGroup";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EvaluationBaseForm(props: {
  userId: string;
  evaluation?: EvaluationBaseType;
}) {
  const form = useForm({
    resolver: zodResolver(EvaluationBaseTypeFormSchema),
    defaultValues: {
      name: props.evaluation?.name || "",
      description: props.evaluation?.description || "",
      gradeType: props.evaluation?.gradeType.name || "Numeric",
      isGraded: props.evaluation?.isGraded || true,
    },
  });
  const {
    mutate: createEvaluation,
    isPending,
    isSuccess,
  } = useCreateBaseEvaluation();
  const {
    mutate: updateEvaluation,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
  } = useUpdateBaseEvaluation();
  const [criterias, setCriterias] = useState<EvaluationCriteriaType[]>(
    props.evaluation?.criterias || []
  );
  const [openArray, setOpenArray] = useState<boolean[]>(
    props.evaluation?.criterias.map(() => false) || []
  );
  // Handler to add a new criteria
  const addCriteria = () => {
    console.log("Adding criteria", form.getValues("gradeType"));
    // If the gradeType is not selected, show an error message
    if (!form.getValues("gradeType")) {
      toast.error("Please select a grade type before adding criteria");
      return;
    }
    const gradeVal = form.getValues("gradeType") as unknown;
    const gradeType = getGradeTypeByName(
      gradeVal as GradeTypeUnionType["name"]
    );
    console.log("Grade Type:", gradeType);
    setCriterias([
      ...criterias,
      {
        id: crypto.randomUUID(),
        weight: 1,
        name: "",
        description: "",
        isGraded: true,
        gradeType,
        createdBy: props.userId,
      },
    ]);
  };
  function onSubmit(values: EvaluationBaseTypeForm) {
    const gradeVal = form.getValues("gradeType") as unknown;
    const gradeType = getGradeTypeByName(
      gradeVal as GradeTypeUnionType["name"]
    );
    const evaluation: Omit<EvaluationBaseType, "id" | "createdAt"> = {
      ...values,
      gradeType,
      criterias,
      createdBy: props.userId,
    };
    console.log("Evaluation:", evaluation);
    const isValid = EvaluationBaseTypeFormSchema.safeParse(evaluation);
    if (!isValid.success) {
      toast.error("Invalid evaluation base data");
      return;
    }
    // Check if all the criteria gradeTypes are the same as the evaluation gradeType
    const isValidCriteria = criterias.every(
      (criteria) => criteria.gradeType.type === evaluation.gradeType.type
    );
    if (!isValidCriteria) {
      toast.error("Criteria grade types must match the evaluation grade type");
      return;
    }
    // Check if all the weight values are min 0.5
    const isValidWeights = criterias.every(
      (criteria) => criteria.weight >= 0.5
    );

    if (!isValidWeights) {
      toast.error("Criteria weight must be at least 0.5");
      return;
    }

    // Check that the criterias are not empty and have unique names and descriptions before submitting
    const isValidCriterias = criterias.every(
      (criteria) =>
        criteria.name.length > 0 &&
        criteria.description.length > 0 &&
        criterias.filter((c) => c.name === criteria.name).length === 1
    );
    if (!isValidCriterias) {
      toast.error("Invalid criteria data", {
        description: `Criteria names and descriptions must be unique and not empty`,
      });
      return;
    }
    console.log("Form Submitted:", evaluation);
    if (props.evaluation) {
      updateEvaluation({
        evaluationId: props.evaluation.id,
        ...evaluation,
      });
      return;
    }
    createEvaluation(evaluation);
  }

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
    <div className="space-y-8 py-8 px-4 md:px-0  rounded-lg shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full max-w-lg mx-auto"
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

          <div className="flex justify-between items-center space-x-4">
            {/* Button to add a new criteria */}
            <Button disabled={isPending || isUpdatePending} type="submit">
              Submit
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
