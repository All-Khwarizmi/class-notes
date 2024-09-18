"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Plus, Trash, ChevronRight } from "lucide-react";
import { isLeft } from "fp-ts/lib/Either";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/core/components/ui/accordion";
import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { ScrollArea } from "@/core/components/ui/scroll-area";
import { groupCompetencesByCategory } from "../../domain/entities/schemas";
import { useGetCompCat } from "../../application/adapters/services/useGetCompCat";
import { useDeleteCompCat } from "@/features/complement/application/adapters/services/useDeleteCompCat";
import UpdateCompetenceForm from "../components/UpdateCompetenceForm";

export default function CompetencesTable({ userId }: { userId: string }) {
  const { data: compCat } = useGetCompCat({ userId });
  const { mutate: deleteCompCat } = useDeleteCompCat();

  const groupedCompetences = useMemo(() => {
    if (!compCat || isLeft(compCat)) return [];
    const competences = compCat.right.competences;
    return groupCompetencesByCategory(competences);
  }, [compCat]);

  if (!compCat || isLeft(compCat)) return null;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Competences</h1>
      <ScrollArea className="h-[calc(100vh-200px)] pr-4">
        <Accordion type="multiple" className="space-y-4">
          {groupedCompetences.map((group) => {
            const category = compCat.right.categories.find(
              (cat) => cat.name === group.category
            );
            return (
              <AccordionItem
                key={group.category}
                value={group.category}
                className="border rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-2 hover:bg-muted">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xl font-semibold">
                      {group.category}
                    </span>
                    <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 space-y-4">
                    {category && (
                      <div className="flex items-center justify-between gap-4 pb-2 border-b">
                        <div>
                          <h3 className="font-semibold">Category Details</h3>
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <UpdateCompetenceForm
                            id={category._id}
                            name={category.name}
                            description={category.description}
                            entityName="Category"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              if (
                                confirm(
                                  "Are you sure you want to delete this category?"
                                )
                              ) {
                                deleteCompCat({
                                  type: "Category",
                                  id: category._id,
                                });
                              }
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                    {group.competences.map((competence) => (
                      <Card key={competence._id}>
                        <CardHeader>
                          <CardTitle>{competence.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {competence.description}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                          <UpdateCompetenceForm
                            id={competence._id}
                            name={competence.name}
                            description={competence.description}
                            entityName="Competence"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              if (
                                confirm(
                                  "Are you sure you want to delete this competence?"
                                )
                              ) {
                                deleteCompCat({
                                  type: "Competences",
                                  id: competence._id,
                                });
                              }
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ScrollArea>
      <div className="flex justify-center mt-6">
        <Button asChild>
          <Link href="/competences/add">
            <Plus className="mr-2 h-4 w-4" /> Add Competence or Category
          </Link>
        </Button>
      </div>
    </div>
  );
}
