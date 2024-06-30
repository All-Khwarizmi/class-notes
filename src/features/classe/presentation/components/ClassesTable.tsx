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
import CustomDialog from "../../../../core/components/common/CustomDialog";
import AddClassForm from "./AddClassForm";
import AddIcon from "../../../../core/components/icons/AddIcon";
import Link from "next/link";
import { Delete, Pen, Plus } from "lucide-react";
import VisibilitySwitch from "@/features/cours-sequence/presentation/components/VisibilitySwitch";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";
import { useClassesTableLogic } from "../services/hooks/useClassesTableLogic";
import Layout from "@/core/components/layout/Layout";
import { Button } from "@/core/components/ui/button";
import { cn } from "@/lib/utils";

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
      <section
        className={cn(
          `${
            !classes
              ? "flex flex-col justify-center items-center h-[50vh] gap-4"
              : ""
          }`
        )}
      >
        {classes && classes.right.length > 0 ? (
          <>
            <Table data-testid="classes-table" className="">
              <TableCaption>Ajouter une classe</TableCaption>
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
          </>
        ) : (
          <div className="flex justify-center items-center ">
            <p className="text-gray-400 text-lg font-bold ">
              Vous n&apos;avez pas encore de classes
            </p>
          </div>
        )}
        <article className="flex flex-col py-2">
          <CustomDialog
            open={open}
            setOpen={setOpen}
            icon={<Plus size={16} />}
            title="Ajouter une classe"
            description="Ajouter une classe pour commencer à ajouter des étudiants"
            testId="add-class"
            buttonVariant="outline"
          >
            <AddClassForm
              setOpen={setOpen}
              userId={props.userId}
              refetchClasses={refetchClasses}
            />
          </CustomDialog>
        </article>
      </section>
    </LayoutWithProps>
  );
}
