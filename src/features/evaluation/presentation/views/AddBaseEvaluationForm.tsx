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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Switch } from "@/core/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  EvaluationBaseType,
  EvaluationCriteriaType,
  GradeTypeUnionType,
} from "../../domain/entities/evaluation-schema";
import { useEffect, useState } from "react";
import { Cross, X } from "lucide-react";
import useCreateBaseEvaluation from "../../application/adapters/services/useCreateBaseEvaluation";

// Define the Zod schema for EvaluationBase
const EvaluationBaseSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().optional(),
  isGraded: z.boolean(),

  // Using the GradeTypeUnionSchema from EvaluationBaseSchema
});
const gradeTypes: GradeTypeUnionType[] = [
  {
    name: "Numeric",
    type: "Numeric",
    range: "0-100",
    grade: 0,
  },
  { name: "Percentage", type: "Percentage", grade: 0 },
  {
    name: "US Letter Grades",
    type: "A/B/C/D/F",
    grade: "A",
  },
  {
    name: "US Letter Grades with Pass/Fail",
    type: "A/B/C/D/F/Pass/Fail",
    grade: "A",
  },
  {
    name: "US Letter Grades with Pass/Fail/None",
    type: "A/B/C/D/F/Pass/Fail/None",
    grade: "A",
  },
  { name: "Pass/Fail", type: "Pass/Fail", grade: "Pass" },
  {
    name: "Descriptive Grades",
    type: "Excellent/Good/Satisfactory/Needs Improvement",
    grade: "Excellent",
  },
  { name: "US 4.0 Scale", type: "4.0 Scale", grade: 0 },
  {
    name: "UK Honors",
    type: "First/Upper Second/Lower Second/Third",
    grade: "First",
  },
  { name: "10-point Scale", type: "10-point Scale", grade: 0 },
  { name: "20-point Scale", type: "20-point Scale", grade: 0 },
  { name: "Grade Points", type: "Grade Points", grade: 0 },
  { name: "French Grading", type: "20-point Scale", grade: 0 },
  { name: "German Grading", type: "Numeric", range: "1-5", grade: 0 },
  {
    name: "Australian Grading",
    type: "HD/D/C/P/F",
    grade: "HD",
  },
  { name: "Spanish Grading", type: "10-point Scale", grade: 0 },
  {
    name: "Sport Points",
    type: "Points",
    range: "0-100",
    grade: 0,
  },
  {
    name: "Sport Ranking",
    type: "Ranking",
    grade: "10th",
  },
  { name: "Sport Result", type: "Win/Loss/Tie", grade: "Win" },
  {
    name: "Sport Performance",
    type: "Performance Level",
    grade: "Excellent",
  },
];
export type EvaluationBaseTypeForm = z.infer<typeof EvaluationBaseSchema>;

export default function EvaluationBaseForm(props: { userId: string }) {
  const form = useForm({
    resolver: zodResolver(EvaluationBaseSchema),
    defaultValues: {
      name: "",
      description: "",
      isGraded: true,
      gradeType: { name: "Numeric", type: "Numeric", range: "0-100", grade: 0 }, // Default value for gradeType
    },
  });
  const {
    mutate: createEvaluation,
    isPending,
    isSuccess,
  } = useCreateBaseEvaluation();
  const [criterias, setCriterias] = useState<EvaluationCriteriaType[]>([]);
  // Handler to add a new criteria
  const addCriteria = () => {
    // If the gradeType is not selected, show an error message
    if (!form.getValues("gradeType")) {
      toast.error("Please select a grade type before adding criteria");
      return;
    }
    const gradeVal = form.getValues("gradeType") as unknown;
    const gradeType = getGradeTypeByName(
      gradeVal as GradeTypeUnionType["name"]
    );
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
    const evaluation: Omit<EvaluationBaseType, "id"> = {
      ...values,
      gradeType,
      criterias,
      createdBy: props.userId,
    };
    const isValid = EvaluationBaseSchema.safeParse(evaluation);
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
    createEvaluation(evaluation);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("Evaluation base created successfully!");
      form.reset();
    }
  }, [isSuccess]);
  return (
    <div className="space-y-8 py-8  rounded-lg shadow-md">
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
                  <Select
                    onValueChange={field.onChange}
                    value={field.value.type}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a grade type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Numeric</SelectLabel>
                        <SelectItem value="Numeric">Numeric</SelectItem>
                        <SelectItem value="Percentage">Percentage</SelectItem>
                        <SelectItem value="A/B/C/D/F">
                          US Letter Grades
                        </SelectItem>
                        <SelectItem value="A/B/C/D/F/Pass/Fail">
                          US Letter Grades with Pass/Fail
                        </SelectItem>
                        <SelectItem value="A/B/C/D/F/Pass/Fail/None">
                          US Letter Grades with Pass/Fail/None
                        </SelectItem>
                        <SelectItem value="Pass/Fail">Pass/Fail</SelectItem>
                        <SelectItem value="Excellent/Good/Satisfactory/Needs Improvement">
                          Descriptive Grades
                        </SelectItem>
                        <SelectItem value="4.0 Scale">US 4.0 Scale</SelectItem>
                        <SelectItem value="First/Upper Second/Lower Second/Third">
                          UK Honors
                        </SelectItem>
                        <SelectItem value="10-point Scale">
                          10-point Scale
                        </SelectItem>
                        <SelectItem value="20-point Scale">
                          20-point Scale
                        </SelectItem>
                        <SelectItem value="Grade Points">
                          Grade Points
                        </SelectItem>
                        <SelectItem value="Other">Custom</SelectItem>
                        <SelectLabel>Sports</SelectLabel>
                        <SelectItem value="Points">Sport Points</SelectItem>
                        <SelectItem value="Ranking">Sport Ranking</SelectItem>
                        <SelectItem value="Win/Loss/Tie">
                          Sport Result
                        </SelectItem>
                        <SelectItem value="Performance Level">
                          Sport Performance
                        </SelectItem>
                        <SelectLabel>International</SelectLabel>
                        <SelectItem value="French Grading">
                          French Grading
                        </SelectItem>
                        <SelectItem value="German Grading">
                          German Grading
                        </SelectItem>
                        <SelectItem value="Australian Grading">
                          Australian Grading
                        </SelectItem>
                        <SelectItem value="Spanish Grading">
                          Spanish Grading
                        </SelectItem>
                      </SelectGroup>
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
          {/* Render criteria fields dynamically */}
          <div className="space-y-4 px-2">
            {criterias.map((criteria, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg space-y-2 relative"
              >
                <div className="flex items-center justify-between pb-2">
                  <h3 className="text-lg font-semibold">
                    Criteria {index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedCriterias = [...criterias];
                      updatedCriterias.splice(index, 1);
                      setCriterias(updatedCriterias);
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
                <Input
                  placeholder="Criteria Name"
                  value={criteria.name}
                  onChange={(e) => {
                    const updatedCriterias = [...criterias];
                    updatedCriterias[index].name = e.target.value;
                    setCriterias(updatedCriterias);
                  }}
                />
                <Input
                  placeholder="Criteria Description"
                  value={criteria.description}
                  onChange={(e) => {
                    const updatedCriterias = [...criterias];
                    updatedCriterias[index].description = e.target.value;
                    setCriterias(updatedCriterias);
                  }}
                />
                <Input
                  placeholder="Criteria Weight"
                  type="number"
                  value={criteria.weight}
                  disabled={!criteria.isGraded}
                  onChange={(e) => {
                    // Check if the weight is at least 0.5
                    if (Number(e.target.value) < 0.5) {
                      toast.info("Criteria weight must be at least 0.5", {
                        description: ` Tip: Criteria weight is used to calculate the total score for the evaluation.
                        If you want to remove the criteria, click the delete button on the right side of the criteria box.
                        If you want to disable grading for this criteria, toggle the switch below the criteria name.`,
                      });
                      return;
                    }
                    const updatedCriterias = [...criterias];
                    updatedCriterias[index].weight = Number(e.target.value);
                    setCriterias(updatedCriterias);
                  }}
                />
                <Switch
                  checked={criteria.isGraded}
                  onCheckedChange={(checked) => {
                    const updatedCriterias = [...criterias];
                    updatedCriterias[index].isGraded = checked;
                    setCriterias(updatedCriterias);
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center space-x-4">
            {/* Button to add a new criteria */}
            <Button variant={"outline"} type="button" onClick={addCriteria}>
              Add Criteria
            </Button>
            <Button disabled={isPending} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

// Helper function to validate the selected grade type
function isValidGradeType(selectedType: string) {
  return gradeTypes.some((gradeType) => gradeType.type === selectedType);
}

function getGradeTypeByName(gradeTypeName: GradeTypeUnionType["name"]) {
  return (
    gradeTypes.find((gradeType) => gradeType.name === gradeTypeName) || {
      name: "Numeric",
      type: "Numeric",
      range: "0-100",
      grade: 0,
    }
  );
}
