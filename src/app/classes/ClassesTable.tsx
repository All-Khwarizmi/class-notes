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
import { classUsecases } from "@/usecases/dependency-injection.usecases";

export default function ClassesTable() {
  
  const { error, data } = classUsecases.useGetClasses();

  const router = useRouter();

  if (error) {
    return <div>{error}</div>;
  }
  if (data) {
    return (
      <section className="mt-12 px-4">
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
            {data?.map((c, index) => {
              const classe = c.getOrCrash();
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
}
