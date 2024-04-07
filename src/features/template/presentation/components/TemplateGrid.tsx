import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { twMerge } from "tailwind-merge";
import EditIcon from "@/core/components/icons/EditIcon";
import { Button } from "@/core/components/ui/button";
import { useRouter } from "next/navigation";
import { templatesRepository } from "../../application/repository/templates-repository";
import { useEffect } from "react";
import { is } from "immutable";
import { isRight } from "fp-ts/lib/Either";

//! Remove any type when refactoring
export default function EvaluationGrid({ userId }: { userId: string }) {
  const { templates, loading } = templatesRepository.useGetTemplatesByCreator({
    userId,
  })();
  const router = useRouter();

  if (loading) return <div>Loading...</div>;
  if (templates === "NO DATA")
    return (
      <div>
        <h1>Vous n'avez pas encore d&apos;évaluations</h1>
      </div>
    );
  return (
    <div className={twMerge(`flex md:flex-row flex-col p-4 gap-4 w-full`)}>
      {templates &&
        templates.map((eitherTemplate) => {
          const template = isRight(eitherTemplate.values)
            ? eitherTemplate.values.right
            : null;
          if (!template) return null;
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
  );
}
