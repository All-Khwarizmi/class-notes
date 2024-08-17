"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter } from "@/core/components/ui/card";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Textarea } from "@/core/components/ui/textarea";
import { Competence, competenceSchema } from "../../domain/entities/schemas";
import CustomDialog from "@/core/components/common/CustomDialog";
import { z } from "zod";
import { useUpdateCompCat } from "../../application/adapters/services/useUpdateCompCat";
import { toastWrapper } from "@/core/utils/toast-wrapper";
import { useState } from "react";

export default function UpdateCompetenceForm(props: {
  id: string;
  name: string;
  description: string;
  entityName: "Competence" | "Category";
}) {
  const [open, setOpen] = useState(false);
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
  const { mutate: updateCompCat } = useUpdateCompCat();

  const onSubmit = form.handleSubmit((data) => {
    const { name, description } = data;
    if (props.name === name && props.description === description) {
      return toastWrapper.info("No changes made");
    }
    if (props.entityName === "Competence") {
      updateCompCat(
        {
          id: props.id,
          name: data.name,
          description: data.description,
          type: props.entityName === "Competence" ? "Competences" : "Category",
        },
        {
          onSuccess: () => {
            setOpen(false);
          },
        }
      );
    }
  });

  return (
    <CustomDialog
      open={open}
      setOpen={setOpen}
      buttonText="Edit"
      title={`Edit ${props.entityName}`}
    >
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
