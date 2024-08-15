import useGetClasses from "@/features/classe/presentation/services/hooks/useGetClasses";
import { NavItem } from "@/lib/types";
import { useEffect, useState } from "react";
import Dashboard from "../icons/Dashboard";
import CopyClipboard from "../icons/CopyClipboard";
import useGetAllSequences from "@/features/cours-sequence/application/adapters/services/useGetAllSequences";
import { isRight } from "fp-ts/lib/Either";
import {
  AArrowDown,
  Book,
  BookmarkCheck,
  CandlestickChart,
  FlaskConical,
  Plus,
  Presentation,
  TestTubeDiagonal,
  User,
} from "lucide-react";
import useGetEvaluationsBaseList from "@/features/evaluation/application/adapters/services/useGetEvaluationsBaseList";

export default function useExperimentalLayoutLogic(userId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const { data: classes, isLoading, isError } = useGetClasses({ userId });
  const {
    data: sequences,
    isLoading: sequencesLoading,
    isError: sequencesError,
  } = useGetAllSequences(userId);

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
    if (!sequencesLoading && !isLoading && !evaluationsLoading) {
      setLoading(false);
    }
    if (!sequencesError && !isError && !evaluationsError) {
      setError(false);
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
          icon: <TestTubeDiagonal size={16} className="text-green-500" />,
          href: `/evaluations/${evaluation.id}`,
          color: "text-blue-300",
        }));
        evaluationsNavItems.unshift({
          title: "Show All Evaluations",
          icon: <AArrowDown size={16}  />,
          href: "/evaluations",
          color: "text-blue-300",
        });
        evaluationsNavItems.unshift({
          title: "Add Evaluation",
          icon: <Plus size={16} />,
          href: "/evaluations/add",
          color: "text-blue-300",
        });

        const sequencesNavItems = sequences.right.map((sequence) => ({
          title: sequence.name,
          icon: <Book size={16} className="text-green-500" />,
          href: `/sequences/${sequence._id}?type=template`,
          color: "text-blue-300",
        }));
        sequencesNavItems.unshift({
          title: "Show All Sequences",
          icon: <Presentation size={16} />,
          href: "/sequences?type=template",
          color: "text-blue-300",
        });
        sequencesNavItems.unshift({
          title: "Add Sequence",
          icon: <Presentation size={16} />,
          href: "/sequences/add",
          color: "text-blue-300",
        });
        const classesNavItems = classes.right.map((classe) => ({
          title: classe.name,
          icon: CopyClipboard(),
          href: `/classes/class/${classe.id}`,
          color: "text-blue-300",
        }));
        classesNavItems.push({
          title: "Show All Classes",
          icon: CopyClipboard(),
          href: "/classes",
          color: "text-blue-300",
        });
        classesNavItems.push({
          title: "Add Class",
          icon: CopyClipboard(),
          href: "/classes/add",
          color: "text-blue-300",
        });
        setNavItems((prev) => [
          {
            title: "Dashboard",
            icon: Dashboard(),
            href: "/dashboard",
            color: "text-blue-300",
          },
          {
            title: "Classes",
            icon: Dashboard(),
            href: "/classes",
            color: "text-blue-300",
            isChidren: true,
            children: classesNavItems,
          },
          {
            title: "Sequences",
            icon: <Presentation size={16} />,
            href: "/sequences",
            color: "text-blue-300",
            isChidren: true,
            children: sequencesNavItems,
          },
          {
            title: "Evaluations",
            icon: <FlaskConical size={16} className="text-green-500" />,
            href: "/evaluations",
            color: "text-blue-300",
            isChidren: true,
            children: evaluationsNavItems,
          },
          {
            title: "Competences",
            icon: <BookmarkCheck size={16} />,
            href: "/competences",
            color: "text-blue-300",
          },

          {
            title: "Profile",
            icon: <User size={16} />,
            href: "/profile",
            color: "text-blue-300",
          },

          {
            title: "My Space",
            icon: <User size={16} />,
            href: `/spaces?user=${userId}`,
            color: "text-blue-300",
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
