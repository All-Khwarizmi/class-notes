import CustomDialog from "@/core/components/common/CustomDialog";
import { FormItem, FormLabel } from "@/core/components/ui/form";
import { Competence } from "@/features/comp-cat/domain/entities/schemas";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function CompetenceSelectorDialog({
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
  setSelectedCompetences: Dispatch<
    SetStateAction<
      {
        category: string;
        name: string;
        description: string;
        createdBy: string;
        _id: string;
      }[]
    >
  >;
}) {
  return (
    <FormItem>
      <FormLabel htmlFor="competences">Competences</FormLabel>
      {/* display of selected compenteces if any. Nicely put in a responsive layout */}
      <div className="grid grid-flow-col-dense pb-2">
        {selectedCompetences.map((competence) => {
          return (
            <div key={competence._id} className="">
              <div className="">
                <span className="bg-slate-400 dark:bg-blue-400 py-1 px-2 rounded-full text top-0 right-0 relative">
                  {competence.name}
                  <button
                    onClick={() => {
                      setSelectedCompetences((prev) =>
                        prev.filter((c) => c._id !== competence._id)
                      );
                    }}
                    className="bg-red-500 dark:bg-red-600 py-1 px-2 rounded-full text-white absolute top-0 right-0 -mt-2 -mr-2"
                  >
                    <Trash2 size={8} className="" />
                  </button>
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <CustomDialog title="Select competences" open={open} setOpen={setOpen}>
        <div className="grid grid-cols-2 gap-4">
          {competences.map((competence) => {
            return (
              <div key={competence._id}>
                <input
                  type="checkbox"
                  checked={selectedCompetences.some(
                    (c) => c._id === competence._id
                  )}
                  id={competence._id}
                  value={competence._id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCompetences((prev) => [...prev, competence]);
                    } else {
                      setSelectedCompetences((prev) =>
                        prev.filter((c) => c._id !== competence._id)
                      );
                    }
                  }}
                />
                <label htmlFor={competence._id}>{competence.name}</label>
              </div>
            );
          })}
        </div>
      </CustomDialog>
    </FormItem>
  );
}
