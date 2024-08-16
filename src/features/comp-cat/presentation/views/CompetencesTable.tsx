import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
import {
  Category,
  Competence,
  groupCompetencesByCategory,
} from "../../domain/entities/schemas";
import { Button } from "@/core/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { TypographyH4 } from "@/core/components/common/Typography";

export default function CompetencesTable({
  competences,
  categories,
  userId,
}: {
  competences: Competence[];
  categories: Category[];
  userId: string;
}) {
  const groupedCompetences = useMemo(
    () => groupCompetencesByCategory(competences),
    [competences]
  );
  return (
    <main className="  rounded-md p-4 ">
      <h1 className="text-3xl font-bold pb-8 ">
        <span>Competences</span>
      </h1>
      <Table>
        <TableCaption>Add competences or category</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            // Loop through the groupedCompetences
            groupedCompetences.map((group) => (
              <TableRow key={group.category} className="border-none">
                <TableCell colSpan={4} className="font-bold">
                  <Accordion type="multiple">
                    <AccordionItem value={group.category}>
                      <AccordionTrigger>
                        <TypographyH4 text={group.category} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-4 space-y-4">
                          {group.competences.map((competence) => (
                            <Card
                              key={competence._id}
                              className="bg-background shadow-inner shadow-slate-900 "
                            >
                              <CardHeader>
                                <CardTitle>{competence.name}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <CardDescription>
                                  {competence.description}
                                </CardDescription>
                              </CardContent>
                              <CardFooter className="flex justify-end">
                                <Link href={`/competences/${competence._id}`}>
                                  <Button>Edit</Button>
                                </Link>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      {/* Add Competence button */}
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
