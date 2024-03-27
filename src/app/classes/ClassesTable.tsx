import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import CustomDialog from "../../components/CustomDialog";
import { useRouter } from "next/navigation";
import AddClassForm from "./AddClassForm";
import AddIcon from "../../components/icons/AddIcon";
import useGetClasses from "@/hooks/class/useGetClasses";
import MessageFullScreen from "@/components/MessageFullScreen";
import { isRight } from "fp-ts/lib/Either";

export default function ClassesTable() {
  const { classes, error, loading } = useGetClasses();

  const router = useRouter();
  if (loading) {
    return <MessageFullScreen message={"Chargement..."} />;
  }
  if (error) {
    return <MessageFullScreen message={error} />;
  }

  return (
    <section className="p-4 pt-0">
      <Table>
        <TableCaption>Ajouter classe</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
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
              <TableRow
                onClick={() => {
                  router.push(`/class/${classe.id}`);
                }}
                key={classe.id}
              >
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex justify-center pt-4">
        {" "}
        <CustomDialog
          icon={<AddIcon />}
          title="Ajouter une classe"
          description="Ajouter une classe pour commencer à ajouter des étudiants"
          testId="add-class"
        >
          <AddClassForm />
        </CustomDialog>
      </div>
    </section>
  );
}
