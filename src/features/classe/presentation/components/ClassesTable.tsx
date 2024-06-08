"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import CustomDialog from "../../../../core/components/common/CustomDialog";
import AddClassForm from "./AddClassForm";
import AddIcon from "../../../../core/components/icons/AddIcon";
import Link from "next/link";
import { Button } from "@/core/components/ui/button";
import { classeRepository } from "@/features/classe/application/repository/classe-repository";
import { ClassType } from "../../domain/class-schema";
import { Pen } from "lucide-react";
import ClasseVisibilitySwitch from "./ClasseVisibilitySwitch";

export default function ClassesTable(props: { classes: ClassType[] }) {
  const { setClasseId } = classeRepository.useDeleteClasse();
  const handleDelete = async (id: string) => {
    setClasseId(id);
  };

  return (
    <section className="flex flex-col  justify-between p-4  h-[100%]">
      <Table data-testid="classes-table" className="">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Show</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.classes.map((classe) => {
            console.log({ classe })
            return (
              <TableRow key={classe.id} className="cursor-pointer ">
                <Link href={`/classes/class/${classe.id}`} legacyBehavior>
                  <TableCell>{classe.name}</TableCell>
                </Link>
                <Link
                  className="cursor-pointer "
                  href={`/classes/class/${classe.id}`}
                  legacyBehavior
                >
                  <TableCell>{classe.description}</TableCell>
                </Link>

                <TableCell className="flex justify-center">
                  {/* Delete */}
                  <Button
                    data-testid="delete-class"
                    className="mr-2"
                    onClick={async () => {
                      await handleDelete(classe.id?.toString() || "");
                    }}
                    variant="destructive"
                  >
                    -
                  </Button>

                  {/* Edit */}

                  <Link href={`/classes/class/${classe.id}`}>
                    <Button data-testid="edit-class" variant="link">
                      <Pen size={16} />
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <ClasseVisibilitySwitch
                    visible={classe.publish}
                    id={classe.id}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <section className="flex justify-between items-center py-2 ">
        <footer className="flex h-full items-center">
          <h1 className="font-bold text-sm py-1 px-4 dark:bg-gray-600 rounded ">
            Vous avez {props.classes.length} classes
          </h1>
        </footer>
        <article className="flex flex-col gap-y-2">
          <CustomDialog
            icon={<AddIcon />}
            title="Ajouter une classe"
            description="Ajouter une classe pour commencer à ajouter des étudiants"
            testId="add-class"
          >
            <AddClassForm />
          </CustomDialog>
        </article>
      </section>
    </section>
  );
}
