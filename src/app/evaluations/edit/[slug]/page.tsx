"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/core/components/ui/form";
import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useForm } from "react-hook-form";
import {
  TemplateSchema,
  TemplateType,
} from "@/features/template/domain/entities/template-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Textarea } from "@/core/components/ui/textarea";

export default function EditEvaluation({
  params,
}: {
  params: { slug: string };
}) {
  const evaluationTemplate = useQuery(
    api.evaluation_template.getEvaluationTemplateWithCriteria,
    {
      templateId: params.slug,
    }
  );
  const templateForm = useForm<TemplateType>({
    resolver: zodResolver(TemplateSchema),
    defaultValues: {
      name: evaluationTemplate?.name,
      description: evaluationTemplate?.description,
    },
  });
  const criteria = evaluationTemplate?.criteria.map((c) => {
    if (c.status === "fulfilled") {
      return c.value;
    } else {
      return null;
    }
  });

  async function onSubmit(values: TemplateType) {
    console.log(values);
  }
  return (
    <section className="h-ful w-full p-8">
      <h1>Édition de l&apos;évaluation {evaluationTemplate?.name} </h1>
      <Form {...templateForm}>
        <form onSubmit={templateForm.handleSubmit(onSubmit)}>
          <FormField
            control={templateForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Nom</FormLabel>
                <FormControl>
                  <Input
                    data-testid="evaluation-name-input"
                    placeholder={evaluationTemplate?.name}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={templateForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Description</FormLabel>
                <FormControl>
                  <Textarea
                    data-testid="evaluation-description-input"
                    placeholder={evaluationTemplate?.description}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Enregistrer</Button>
        </form>
      </Form>
      <h2> Critères </h2>
      {criteria &&
        criteria.map((c) => {
          return (
            <div key={c?._id}>
              <h3> {c?.name} </h3>
              <p> {c?.description} </p>
            </div>
          );
        })}
    </section>
  );
}
