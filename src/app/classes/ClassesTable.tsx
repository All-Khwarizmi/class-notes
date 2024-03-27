import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import CustomDialog from "../../components/CustomDialog";
import AddClassForm from "./AddClassForm";
import AddIcon from "../../components/icons/AddIcon";
import useGetClasses from "@/hooks/class/useGetClasses";
import MessageFullScreen from "@/components/MessageFullScreen";
import { isRight } from "fp-ts/lib/Either";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useDeleteClasse from "@/hooks/class/useDeleteClasse";

export default function ClassesTable() {
  const { classes, error, loading } = useGetClasses();
  const { setClasseId, loading: loadindDeleteClasses } = useDeleteClasse();
  const handleDelete = async (id: string) => {
    setClasseId(id);
  };

  if (loading) {
    return <MessageFullScreen message={"Chargement..."} />;
  }
  if (error) {
    return <MessageFullScreen message={error} />;
  }

  return (
    <section className="flex flex-col  justify-between p-4  h-[100%]">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* //! TODO :make  the failure to have an id 
          //! TODO : make an adapter for the class entity to show in the UI */}
          {classes?.map((c, index) => {
            const classe = isRight(c.values)
              ? c.values.right
              : {
                  id: c.values.left.code || index,
                  name: "Invalid",
                  description: "Invalid",
                  imageUrl: "Invalid",
                };
            return (
              <TableRow key={classe.id} className="cursor-pointer ">
                <TableCell>{classe.name}</TableCell>
                <TableCell>{classe.description}</TableCell>
                <TableCell>
                  <Image
                    className="img-class "
                    src={
                      classe.imageUrl ||
                      "/images/mos-design-Io433E805vo-unsplash.jpg"
                    }
                    alt={`
                  Image de la classe: ${classe.name}`}
                    width={32}
                    height={32}
                  />
                </TableCell>
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
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <section className="flex justify-between items-center py-2 ">
        <footer className="flex h-full items-center">
          <h1 className="font-bold text-sm py-1 px-4 dark:bg-gray-600 rounded ">
            Vous avez {classes?.length} classes
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
