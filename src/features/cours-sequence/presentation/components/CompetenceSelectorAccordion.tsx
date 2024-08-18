import CustomDialog from "@/core/components/common/CustomDialog";
import { FormItem, FormLabel } from "@/core/components/ui/form";
import {
  Competence,
  groupCompetencesByCategory,
} from "@/features/comp-cat/domain/entities/schemas";
import { Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/core/components/ui/accordion";
import { Switch } from "@/core/components/ui/switch";
import { TypographyP } from "@/core/components/common/Typography";
import { useMemo } from "react";
export default function CompetenceSelectorAccordion({
  competences,
  selectedCompetences,
  setSelectedCompetences,
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  competences: Competence[];
  selectedCompetences: Competence[];
  setSelectedCompetences: ({
    competence,
    remove,
  }: {
    competence: Competence;
    remove?: boolean;
  }) => void;
}) {
  const competencesByCategory = useMemo(() => {
    return groupCompetencesByCategory(competences);
  }, [selectedCompetences, competences]);
  return (
    <FormItem>
      <Accordion type="multiple">
        <AccordionItem value="Select Competences">
          <AccordionTrigger> Select Competences</AccordionTrigger>
          <AccordionContent className="ml-4">
            <Accordion type="multiple">
              {competencesByCategory.map((competence) => (
                <AccordionItem
                  key={competence.category}
                  value={competence.category}
                >
                  <AccordionTrigger>
                    <div className="flex justify-between items-center">
                      <TypographyP text={competence.category} />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className=" w-full  mb-2 flex flex-col    gap-4">
                    {competence.competences.map((c) => {
                      const isChecked = selectedCompetences.some(
                        (sc) => sc._id === c._id
                      );
                      return (
                        <div
                          key={c._id}
                          className="flex justify-between rounded-md  p-4 items-center w-full shadow-inner shadow-slate-400  dark:shadow-slate-800 dark:bg-muted bg-gray-300"
                        >
                          <div>
                            <FormLabel>{c.name}</FormLabel>
                            <TypographyP text={c.description} />
                          </div>
                          <div className="flex gap-4">
                            <Switch
                              color="white"
                              className=""
                              checked={isChecked}
                              style={
                                isChecked
                                  ? { backgroundColor: "#10B981" }
                                  : {
                                      backgroundColor: "#EF4444",
                                    }
                              }
                              onCheckedChange={() => {
                                setSelectedCompetences({
                                  competence: c,
                                  remove: isChecked,
                                });
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </FormItem>
  );
}
