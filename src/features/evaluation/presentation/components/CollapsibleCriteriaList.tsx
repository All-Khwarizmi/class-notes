import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/core/components/ui/collapsible';
import { FormLabel } from '@/core/components/ui/form';
import { Input } from '@/core/components/ui/input';
import { Switch } from '@/core/components/ui/switch';
import { cn } from '@/lib/utils';
import { ChevronDown, X } from 'lucide-react';
import { toast } from 'sonner';

import { EvaluationCriteriaType } from '../../domain/entities/evaluation-schema';

function CollapsibleCriteriaList({
  criterias,
  openArray,
  setOpenArray,
  setCriterias,
}: {
  criterias: EvaluationCriteriaType[];
  openArray: boolean[];
  setOpenArray: (openArray: boolean[]) => void;
  setCriterias: (criterias: EvaluationCriteriaType[]) => void;
}) {
  return (
    <>
      {criterias.map((criteria, index) => (
        <Collapsible
          key={criteria.id}
          className=" space-y-2"
          open={openArray[index]}
          onOpenChange={(isOpen) => {
            const updatedOpenArray = [...openArray];
            updatedOpenArray[index] = isOpen;
            setOpenArray(updatedOpenArray);
          }}
        >
          <CollapsibleTrigger className="flex justify-between items-center">
            <div className="flex justify-between items-center gap-2 ">
              <FormLabel>Criteria {index + 1}</FormLabel>{' '}
              <span>
                <ChevronDown
                  className={cn('transform transition-transform duration-500', {
                    'rotate-180': openArray[index],
                  })}
                  size={16}
                />
              </span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="CollapsibleContent">
            <div className="space-y-4">
              <div className="border p-4 rounded-lg space-y-2 relative">
                <div className="flex items-center justify-between pb-2">
                  <button
                    type="button"
                    onClick={() => {
                      const updatedCriterias = [...criterias];
                      updatedCriterias.splice(index, 1);
                      setCriterias(updatedCriterias);
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
                <Input
                  placeholder="Criteria Name"
                  value={criteria.name}
                  onChange={(e) => {
                    const updatedCriterias = [...criterias];
                    updatedCriterias[index].name = e.target.value;
                    setCriterias(updatedCriterias);
                  }}
                />
                <Input
                  placeholder="Criteria Description"
                  value={criteria.description}
                  onChange={(e) => {
                    const updatedCriterias = [...criterias];
                    updatedCriterias[index].description = e.target.value;
                    setCriterias(updatedCriterias);
                  }}
                />
                <Input
                  placeholder="Criteria Weight"
                  type="number"
                  value={criteria.weight}
                  disabled={!criteria.isGraded}
                  onChange={(e) => {
                    // Check if the weight is at least 0.5
                    if (Number(e.target.value) < 0.5) {
                      toast.info('Criteria weight must be at least 0.5', {
                        description: ` Tip: Criteria weight is used to calculate the total score for the evaluation.
                        If you want to remove the criteria, click the delete button on the right side of the criteria box.
                        If you want to disable grading for this criteria, toggle the switch below the criteria name.`,
                      });
                      return;
                    }
                    const updatedCriterias = [...criterias];
                    updatedCriterias[index].weight = Number(e.target.value);
                    setCriterias(updatedCriterias);
                  }}
                />
                <Switch
                  checked={criteria.isGraded}
                  onCheckedChange={(checked) => {
                    const updatedCriterias = [...criterias];
                    updatedCriterias[index].isGraded = checked;
                    setCriterias(updatedCriterias);
                  }}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </>
  );
}

export default CollapsibleCriteriaList;
