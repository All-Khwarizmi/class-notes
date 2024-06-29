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
import { Delete, Pen } from "lucide-react";
import VisibilitySwitch from "@/features/cours-sequence/presentation/components/VisibilitySwitch";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";
import { useClassesTableLogic } from "../services/hooks/useClassesTableLogic";
import Layout from "@/core/components/layout/Layout";

export default function ClassesTable(props: { userId: string }) {
  const {
    classes,
    isLoading,
    isError,
    error,
    refetchClasses,
    open,
    setOpen,
    handleDelete,
  } = useClassesTableLogic({ userId: props.userId });

  if (isLoading) {
    return (
      <Layout isLoading>
        <Layout.LoadingSkeleton />
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout
        isError={{
          message: "Une erreur s'est produite lors du chargement des classes",
          description: error?.message,
        }}
      >
        <Layout.ErrorDialog />
      </Layout>
    );
  }

  return (
    <LayoutWithProps>
      <section className="flex flex-col  justify-between h-[100%]">
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
            {classes?.right.map((classe) => {
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

                  <TableCell className="flex justify-center items-center gap-4">
                    {/* Delete */}
                    <Delete
                      className="cursor-pointer text-red-500"
                      onClick={async () => {
                        const confirmed = confirm(
                          "Are you sure you want to delete this class?"
                        );
                        if (confirmed) {
                          await handleDelete(classe.id?.toString() || "");
                        }
                      }}
                      size={20}
                    />

                    {/* Edit */}

                    <Link href={`/classes/class/${classe.id}`}>
                      <Pen size={16} />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <VisibilitySwitch
                      userId={props.userId}
                      type="classe"
                      typeId={classe.id}
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
              Vous avez {classes?.right.length} classes
            </h1>
          </footer>
          <article className="flex flex-col gap-y-2">
            <CustomDialog
              open={open}
              setOpen={setOpen}
              icon={<AddIcon />}
              title="Ajouter une classe"
              description="Ajouter une classe pour commencer à ajouter des étudiants"
              testId="add-class"
            >
              <AddClassForm
                setOpen={setOpen}
                userId={props.userId}
                refetchClasses={refetchClasses}
              />
            </CustomDialog>
          </article>
        </section>
      </section>
    </LayoutWithProps>
  );
}
