"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "convex/react";
import { listDynamicFieldsByCreator } from "../../../convex/dynamic_fields";
import { api } from "../../../convex/_generated/api";
import { Card } from "@/components/ui/card";

export default function Fields() {
  const fields = useQuery(api.dynamic_fields.listDynamicFieldsByCreator);
  console.log(fields);
  return (
    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
      <h2 className="py-2 text-lg">Sous-critères d'évaluation</h2>
      {fields?.map((field) => (
        <Card key={field._id}>
          <h3>{field.fieldKey}</h3>
         
        </Card>
      ))}
    </ScrollArea>
  );
}
