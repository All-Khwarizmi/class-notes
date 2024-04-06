import {
  EvaluationType,
  EvaluationSchema,
} from "@/features/evaluations/domain/entities/evaluation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { api } from "../../../../../convex/_generated/api";
import { Button } from "@/core/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/core/components/ui/form";
import { Input } from "@/core/components/ui/input";
import { Textarea } from "@/core/components/ui/textarea";

export default function EvaluationEditForm(
  template: typeof api.evaluation_template.getEvaluationTemplateWithCriteria._returnType
) {
  const form = useForm<EvaluationType>({
    resolver: zodResolver(EvaluationSchema),
    defaultValues: {
      name: template?.name,
      description: template?.description,
    },
  });
  function onSubmit(values: EvaluationType) {
    console.log(values);
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
                    data-testid="evaluation-name-input"
                    placeholder="Nom de l'évaluation"
                    {...field}
                  />
                </FormControl>
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
                  <Textarea
                    data-testid="evaluation-description-input"
                    placeholder="Description de l'évaluation"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Enregistrer</Button>
        </form>
      </Form>
    </>
  );
}
