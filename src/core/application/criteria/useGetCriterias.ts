import { useSession } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useEffect, useState } from "react";
import {
  CriteriaSchema,
  CriteriaType,
} from "@/core/domain/criteria/criteria-schema";
import { toast } from "sonner";

export default function useGetCriterias() {
  const { isSignedIn, session } = useSession();
  const criterias = useQuery(api.criteria.listCriteriaByCreator, {
    userId: session?.user.id || "",
  });
  const [loading, setLoading] = useState(true);
  const [criteriaList, setCriteriaList] = useState<CriteriaType[] | null>();

  useEffect(() => {
    if (!isSignedIn) {
      return;
    }
    if (criterias) {
      const parsedCriterias: CriteriaType[] = [];
      console.log(criterias);
      criterias.forEach((criteria) => {
        const criteriaData = CriteriaSchema.safeParse(criteria);
        if (criteriaData.success) {
          parsedCriterias.push(criteriaData.data);
        } else {
          //! This is a temporary solution, you should handle this error in a better way
          toast.error("Failed to parse some criteria data");
          console.error(criteriaData.error.errors);
        }
      });
      setCriteriaList(parsedCriterias);
      setLoading(false);
    }
  }, [criterias]);

  if (!isSignedIn) {
    return { loading: false, criteriaList: null };
  }
  return { loading, criteriaList };
}
