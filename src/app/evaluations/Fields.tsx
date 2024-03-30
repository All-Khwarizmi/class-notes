"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "convex/react";
import { listDynamicFieldsByCreator } from "../../../convex/dynamic_fields";
import { api } from "../../../convex/_generated/api";
import { Card } from "@/components/ui/card";
import { useSession } from "@clerk/nextjs";

export default function Fields() {
  const { isSignedIn, session } = useSession();
  const fields = useQuery(api.dynamic_fields.listDynamicFieldsByCreator, {
    userId: session?.user.id || "",
  });

  return (
    <>
      {fields && (
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <h2 className="py-2 text-lg">Sous-critères d&apos;évaluation</h2>
          {fields?.map((field) => (
            <Card key={field._id}>
              <h3>{field.fieldKey}</h3>
            </Card>
          ))}
        </ScrollArea>
      )}
    </>
  );
}
