import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ClassEntityDto } from "@/infrastructure/class/class-repository.impl";
import { isRight } from "fp-ts/lib/Either";
import ClassEntity from "@/domain/class/class-entity";
import { useEffect, useState } from "react";
import { useSession } from "@clerk/nextjs";
import { toast } from "sonner";

export default function useGetClasses() {
  const { isSignedIn, session } = useSession();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [classes, setClasses] = useState<ClassEntity[] | null>(null);
  const rawClasses = useQuery(api.classes.getClasses, {
    id: session?.user.id || "",
  });
  useEffect(() => {
    if (!isSignedIn) {
      toast.error("You need to sign in to view classes");
      setLoading(false);
      setError("You need to sign in to view classes");
      return;
    }
    if (rawClasses) {
      //!TODO: refactor this. -Now we are using the Either monad to handle the error by filtering the invalid values. But we should do something about the fault classes if any
      const classeEntities = rawClasses.map((c) => {
        const classEntity = ClassEntityDto.toDomain(c);
        if (isRight(classEntity)) {
          return classEntity.right;
        }
        return ClassEntity.create({
          name: "Invalid",
          description: "Invalid",
          imageUrl: "Invalid",
        });
      });
      setClasses(classeEntities);

      setError(undefined);
      setLoading(false);
    } else {
      setLoading(true);
      setError("Error while fetching classes");
    }
  }, [rawClasses]);

  if (!isSignedIn) {
    return {
      classes: [],
      error: "You need to sign in to view classes",
      loading: false,
    };
  }
  return {
    classes,
    error,
    loading,
  };
}
