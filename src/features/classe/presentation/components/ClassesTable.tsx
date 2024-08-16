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
import Link from "next/link";
import { Delete, Pen, Plus } from "lucide-react";
import { useClassesTableLogic } from "../services/hooks/useClassesTableLogic";
import Layout from "@/core/components/layout/Layout";
import { cn } from "@/lib/utils";
import { Button } from "@/core/components/ui/button";
import { TypographyH1 } from "@/core/components/common/Typography";

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
    return <Layout.LoadingSkeleton />;
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
    <section className={cn(`py-8 px-4`)}>
      <header className="pb-12">
        <TypographyH1 text="Mes Classes" />
      </header>
      {classes && classes.right.length > 0 ? (
        <>
          <Table data-testid="classes-table" className="">
            <TableCaption>Ajouter une classe</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
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

                    <TableCell className="flex gap-4">
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
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </>
      ) : (
        <>
          {/* Display empty table with test attribute only and the message of emptyness */}
          <Table data-testid="classes-table" className="">
            <TableCaption>
              Vous n&apos;avez pas encore ajouté de classe. Ajoutez une classe
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead>Show</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody></TableBody>
          </Table>
        </>
      )}
      <article className="flex flex-col py-8 items-center">
        <div>
          <Link data-testid="add-class" href={`/classes/add`}>
            <Button className="w-full">
              <Plus size={16} />
            </Button>
          </Link>
        </div>
      </article>
    </section>
  );
}
