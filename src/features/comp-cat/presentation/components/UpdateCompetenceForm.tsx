"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/core/components/ui/card";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Textarea } from "@/core/components/ui/textarea";
import { Competence, competenceSchema } from "../../domain/entities/schemas";
import CustomDialog from "@/core/components/common/CustomDialog";
import { z } from "zod";

export default function UpdateCompetenceForm(props: {
  name: string;
  description: string;
  entityName: string;
}) {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: competenceSchema.shape.name,
        description: competenceSchema.shape.description,
      })
    ),
    defaultValues: {
      name: props.name,
      description: props.description,
    },
  });

  const onSubmit = form.handleSubmit((data) => {});

  return (
    <CustomDialog buttonText="Edit" title={`Edit ${props.entityName}`}>
      <Card className="w-full max-w-md bg-inherit border-none">
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="font-medium">
                {props.entityName} Name
              </label>
              <Input
                id="name"
                placeholder={`Enter the ${props.entityName} name`}
                {...form.register("name")}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="font-medium">
                {props.entityName} Description
              </label>
              <Textarea
                id="description"
                placeholder={`Enter the ${props.entityName} description`}
                className="min-h-[100px]"
                {...form.register("description")}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </CustomDialog>
  );
}
