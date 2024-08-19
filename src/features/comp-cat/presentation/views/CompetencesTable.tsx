"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/core/components/ui/accordion";
import { groupCompetencesByCategory } from "../../domain/entities/schemas";
import { Button } from "@/core/components/ui/button";
import Link from "next/link";
import { Plus, Trash } from "lucide-react";
import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import {
  HeaderTypographyH1,
  TypographyH4,
  TypographyLead,
  TypographySmall,
} from "@/core/components/common/Typography";
import UpdateCompetenceForm from "../components/UpdateCompetenceForm";
import { useGetCompCat } from "../../application/adapters/services/useGetCompCat";
import { isLeft } from "fp-ts/lib/Either";
import { useDeleteCompCat } from "@/features/complement/application/adapters/services/useDeleteCompCat";

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
    <main className="  rounded-md px-4 ">
      <HeaderTypographyH1 text="Competences" />
      <Table>
        <TableCaption>Add competences or category</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <TypographySmall text="Category" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groupedCompetences.map((group) => {
            // Fleaky code since there could have multiple categories with the same name
            // Should add the category id to the groupedCompetences object
            const category = compCat.right.categories.find(
              (cat) => cat.name === group.category
            );
            return (
              <TableRow key={group.category} className="border-none">
                <TableCell colSpan={4} className="font-bold">
                  <Accordion type="multiple">
                    <AccordionItem value={group.category}>
                      <AccordionTrigger>
                        <TypographyH4 text={group.category} />
                      </AccordionTrigger>

                      <AccordionContent className="flex flex-col gap-4">
                        {category && (
                          <div className="pl-4 flex gap-4">
                            <UpdateCompetenceForm
                              id={category._id}
                              name={category.name}
                              description={category.description}
                              entityName="Category"
                            />
                            <Button
                              variant={"destructive"}
                              onClick={() =>
                                confirm("Are you sure you want to delete") &&
                                deleteCompCat({
                                  type: "Category",
                                  id: category._id,
                                })
                              }
                            >
                              <Trash size={16} />
                            </Button>
                          </div>
                        )}
                        <div className="pl-4 space-y-4">
                          {group.competences.map((competence) => (
                            <Card
                              key={competence._id}
                              className="bg-background shadow-inner shadow-slate-900 "
                            >
                              <CardHeader>
                                <CardTitle>
                                  <TypographyLead text={competence.name} />
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <CardDescription>
                                  {competence.description}
                                </CardDescription>
                              </CardContent>
                              <CardFooter className="flex justify-end gap-4">
                                <UpdateCompetenceForm
                                  id={competence._id}
                                  name={competence.name}
                                  description={competence.description}
                                  entityName="Competence"
                                />
                                <Button
                                  variant={"destructive"}
                                  onClick={() =>
                                    confirm(
                                      "Are you sure you want to delete"
                                    ) &&
                                    deleteCompCat({
                                      type: "Competences",
                                      id: competence._id,
                                    })
                                  }
                                >
                                  <Trash size={16} />
                                </Button>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex justify-center py-4">
        <Link href={"/competences/add"}>
          <Button>
            <Plus size={20} />
          </Button>
        </Link>
      </div>
    </main>
  );
}
