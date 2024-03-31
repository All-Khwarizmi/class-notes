"use client";
import { twMerge } from "tailwind-merge";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useSession } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditIcon from "@/components/icons/EditIcon";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();
  const { isSignedIn, session } = useSession();
  const templates = useQuery(
    api.evaluation_template.listEvaluationTemplatesByCreator,
    {
      userId: session?.user.id || "",
    }
  );
  //! Add loading skeleton
  return (
    <section className="h-full w-full flex flex-col gap-4 md:justify-between justify-around p-4">
      <div className={twMerge(`flex md:flex-row flex-col p-4 gap-4 w-full`)}>
        {templates &&
          templates.map((template) => {
            return (
              <Card
                key={template._id}
                className={twMerge(
                  `hover:border-primary-500 border-primary-200 `,
                  ` shadow-slate-300 shadow-sm hover:shadow-md hover:shadow-slate-100 border-2 rounded-md hover:scale-105 transition-transform duration-300 ease-in-out`,
                  `flex flex-col justify-between`
                )}
              >
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{template.description}</CardDescription>
                </CardContent>
                <CardFooter className=" h-max  justify-center flex flex-row ">
                  <Button
                    onClick={() => {
                      router.push(`/evaluations/edit/${template._id}`);
                    }}
                    variant="link"
                  >
                    <EditIcon />
                  </Button>
                  <Button variant="link">Assigner</Button>
                </CardFooter>
              </Card>
            );
          })}
      </div>
      <footer className="flex justify-center pb-4">
        <Button variant="default">Créer Évaluation</Button>
      </footer>
    </section>
  );
}
