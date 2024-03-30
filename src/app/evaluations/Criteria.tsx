"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "@clerk/nextjs";
export default function Criteria() {
  const { isSignedIn, session } = useSession();
  const criterias = useQuery(api.criteria.listCriteriaByCreator, {
    userId: session?.user.id || "",
  });

  return (
    <>
      {criterias && (
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <h2 className="py-2 text-lg">Critères d'évaluation</h2>
          {criterias?.map((criteria, index) => (
            <Card key={criteria._id}>
              <CardHeader>
                <CardTitle>
                  {" "}
                  {index + 1}- {criteria.name}
                </CardTitle>
                <CardDescription>{criteria.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </ScrollArea>
      )}
    </>
  );
}
