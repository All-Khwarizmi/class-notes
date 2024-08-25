import React from "react";
import {
  Category,
  Competence,
  CompetenceByCategory,
} from "../../domain/entities/schemas";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import CustomDialog from "@/core/components/common/CustomDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/core/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Plus, Trash } from "lucide-react";
import {
  TypographyH4,
  TypographyLead,
} from "@/core/components/common/Typography";
import { set } from "lodash";

function CompetenceAccordionListModal(props: {
  competencesByCategory: CompetenceByCategory[];
  categories: Category[];
  addCriteria: (options?: { name: string; description: string }) => void;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <CustomDialog
      title="Competences"
      description="Select a competence to add a criteria"
      buttonText="Select competence"
      displayButton
      open={open}
      setOpen={setOpen}
    >
      {props.competencesByCategory.map((group) => {
        // Fleaky code since there could have multiple categories with the same name
        // Should add the category id to the groupedCompetences object
        const category = props.categories.find(
          (cat) => cat.name === group.category
        );
        return (
          <Accordion type="multiple" key={group.category} className="pt-4">
            <AccordionItem value={group.category}>
              <AccordionTrigger>
                <TypographyH4 text={group.category} />
              </AccordionTrigger>

              <AccordionContent className="flex flex-col gap-4 w-full">
                <div className="pl-4 space-y-4">
                  {group.competences.map((competence) => (
                    <Card
                      key={competence._id}
                      className="shadow-inner w-full shadow-slate-900 "
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
                        <Button
                          onClick={() => {
                            props.addCriteria({
                              name: competence.name,
                              description: competence.description,
                            });
                            setOpen(false);
                          }}
                        >
                          Select
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </CustomDialog>
  );
}

export default CompetenceAccordionListModal;
