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
import {
  TypographyH1,
  TypographyH4,
  TypographyLarge,
  TypographyLead,
  TypographyMuted,
  TypographySmall,
} from "@/core/components/common/Typography";
import UpdateCompetenceForm from "../components/UpdateCompetenceForm";

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
      <header className="flex justify-between items-center py-8">
        <TypographyH1 text="Competences" />
      </header>
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
          {groupedCompetences.map((group) => (
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
                              <CardTitle>
                                <TypographyLead text={competence.name} />
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <CardDescription>
                                <TypographyMuted
                                  text={competence.description}
                                />
                              </CardDescription>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                              <UpdateCompetenceForm
                                name={competence.name}
                                description={competence.description}
                                entityName="Competence"
                           
                              />
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TableCell>
            </TableRow>
          ))}
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
