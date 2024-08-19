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
import {
  HeaderTypographyH1,
  TypographyH1,
} from "@/core/components/common/Typography";
import CoursSequenceCard from "@/features/cours-sequence/presentation/components/CoursSequenceCard";
import { BASE_IMAGE_URL } from "@/core/constants/image";

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
    <section className={cn(` px-4`)}>
      <HeaderTypographyH1 text="Mes Classes" />
      {classes && classes.right.length > 0 ? (
        <section className="grid grid-cols-1  gap-4 sm:grid-cols-3   lg:grid-cols-4">
          {classes.right.map((classe) => (
            <CoursSequenceCard
              deleteOption={true}
              deleteSequence={() => {
                const confirmation = window.confirm(
                  "Are you sure you want to delete this classe?"
                );
                if (confirmation) {
                  handleDelete(classe.id);
                }
              }}
              key={classe.id}
              title={classe.name}
              description={classe.description ?? ""}
              imageUrl={classe.imageUrl ?? BASE_IMAGE_URL}
              tags={classe.educationLevel}
              showViewButton={true}
              pathToView={`/classes/${classe.id}`}
              path={`/classes/edit/${classe.id}`}
              spacesMode={true}
            />
          ))}
        </section>
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
