import useGetClasses from "@/features/classe/presentation/services/hooks/useGetClasses";
import { NavItem } from "@/lib/types";
import { useSession, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Dashboard from "../icons/Dashboard";
import CopyClipboard from "../icons/CopyClipboard";
import useGetAllSequences from "@/features/cours-sequence/application/adapters/services/useGetAllSequences";
import { isRight } from "fp-ts/lib/Either";
import { CandlestickChart, Presentation, User } from "lucide-react";
import useGetEvaluationsBaseList from "@/features/evaluation/application/adapters/services/useGetEvaluationsBaseList";

export default function useExperimentalLayoutLogic(userId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  const {
    data: sequences,
    isLoading: sequencesLoading,
    isError: sequencesError,
  } = useGetAllSequences(userId);
  const { data: classes, isLoading, isError } = useGetClasses({ userId });
  const {
    data: evaluations,
    isLoading: evaluationsLoading,
    isError: evaluationsError,
  } = useGetEvaluationsBaseList({ userId });

  useEffect(() => {
    if (sequencesLoading || isLoading || evaluationsLoading) {
      setLoading(true);
    }
    if (sequencesError || isError || evaluationsError) {
      setError(true);
    }
  }, [
    isLoading,
    isError,
    sequencesLoading,
    sequencesError,
    evaluationsLoading,
    evaluationsError,
  ]);

  useEffect(() => {
    if (
      classes &&
      !isLoading &&
      !isError &&
      sequences &&
      !sequencesLoading &&
      !sequencesError &&
      evaluations &&
      !evaluationsLoading &&
      !evaluationsError
    ) {
      if (isRight(classes) && isRight(sequences) && isRight(evaluations)) {
        const evaluationsNavItems = evaluations.right.map((evaluation) => ({
          title: evaluation.name,
          icon: <CandlestickChart size={16} />,
          href: `/evaluations/${evaluation.id}`,
          color: "text-orange-500",
        }));

        const sequencesNavItems = sequences.right.map((sequence) => ({
          title: sequence.name,
          icon: <Presentation size={16} />,
          href: `/classes/sequences/${sequence._id}`,
          color: "text-orange-500",
        }));
        const classesNavItems = classes.right.map((classe) => ({
          title: classe.name,
          icon: CopyClipboard(),
          href: `/classes/class/${classe.id}`,
          color: "text-orange-500",
        }));
        setNavItems((prev) => [
          {
            title: "Dashboard",
            icon: Dashboard(),
            href: "/dashboard",
            color: "text-sky-500",
          },
          {
            title: "Classes",
            icon: Dashboard(),
            href: "/classes",
            color: "text-sky-500",
            isChidren: true,
            children: classesNavItems,
          },
          {
            title: "Sequences",
            icon: <Presentation size={16} />,
            href: "/sequences",
            color: "text-sky-500",
            isChidren: true,
            children: sequencesNavItems,
          },
          {
            title: "Evaluations",
            icon: <CandlestickChart size={16} />,
            href: "/evaluations",
            color: "text-sky-500",
            isChidren: true,
            children: evaluationsNavItems,
          },

          {
            title: "My Space",
            icon: <User size={16} />,
            href: `/spaces?user=${userId}`,
            color: "text-orange-500",
          },
        ]);
      }
    }
  }, [
    classes,
    isLoading,
    isError,
    sequences,
    sequencesLoading,
    sequencesError,
    evaluations,
    evaluationsLoading,
    evaluationsError,
  ]);

  return {
    loading,
    error,
    navItems,
  };
}
