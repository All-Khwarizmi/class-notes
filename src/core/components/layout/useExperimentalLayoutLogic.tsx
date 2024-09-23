import useGetClasses from "@/features/classe/presentation/services/hooks/useGetClasses";
import { NavItem } from "@/lib/types";
import { useEffect, useState } from "react";
import useGetAllSequences from "@/features/cours-sequence/application/adapters/services/useGetAllSequences";
import { isRight } from "fp-ts/lib/Either";
import {
  AArrowDown,
  Airplay,
  AppWindow,
  Book,
  BookmarkCheck,
  BookText,
  Building,
  FlaskConical,
  GraduationCap,
  Plus,
  TestTubeDiagonal,
  User,
} from "lucide-react";
import useGetEvaluationsBaseList from "@/features/evaluation/application/adapters/services/useGetEvaluationsBaseList";

export default function useExperimentalLayoutLogic(
  userId: string,
  hostname: string
) {
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
          icon: <TestTubeDiagonal size={16} className="text-red-500" />,
          href: `/evaluations/${evaluation.id}`,
          color: "text-blue-300",
        }));
        evaluationsNavItems.unshift({
          title: "Tout afficher", // Changed from "Show All"
          icon: <AArrowDown size={16} />,
          href: "/evaluations",
          color: "text-blue-300",
        });
        evaluationsNavItems.unshift({
          title: "Ajouter une évaluation", // Changed from "Add Evaluation"
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
          title: "Tout afficher", // Changed from "Show All"
          icon: <AArrowDown size={16} />,
          href: "/sequences?type=template",
          color: "text-blue-300",
        });
        sequencesNavItems.unshift({
          title: "Ajouter une séquence", // Changed from "Add Sequence"
          icon: <Plus size={16} />,
          href: "/sequences/add",
          color: "text-blue-300",
        });
        const classesNavItems = classes.right.map((classe) => ({
          title: classe.name,
          icon: <GraduationCap size={16} className="text-blue-500" />,
          href: `/classes/class/${classe.id}`,
          color: "text-blue-300",
        }));
        classesNavItems.unshift({
          title: "Toutes les classes", // Changed from "Show All Classes"
          icon: <AArrowDown size={16} />,
          href: "/classes",
          color: "text-blue-300",
        });
        classesNavItems.unshift({
          title: "Ajouter une classe", // Changed from "Add Class"
          icon: <Plus size={16} />,
          href: "/classes/add",
          color: "text-blue-300",
        });
        setNavItems((prev) => [
          {
            title: "Dashboard",
            icon: <AppWindow size={16} className="text-pink-500" />,
            href: "/dashboard",
            color: "text-blue-300",
          },
          {
            title: "Classes",
            icon: <Building size={16} className="text-blue-500" />,
            href: "/classes",
            color: "text-blue-300",
            isChidren: true,
            children: classesNavItems,
          },
          {
            title: "Sequences",
            icon: <BookText size={16} className="text-green-500" />,
            href: "/sequences",
            color: "text-blue-300",
            isChidren: true,
            children: sequencesNavItems,
          },
          {
            title: "Evaluations",
            icon: <FlaskConical size={16} className="text-red-500" />,
            href: "/evaluations",
            color: "text-blue-300",
            isChidren: true,
            children: evaluationsNavItems,
          },
          {
            title: "Competences",
            icon: <BookmarkCheck size={16} className="text-amber-500" />,
            href: "/competences",
            color: "text-blue-300",
          },

          {
            title: "Mon compte",
            icon: <User size={16} className="text-stone-500" />,
            href: "/profile",
            color: "text-blue-300",
          },

          {
            title: "Mon espace",
            icon: <Airplay size={16} className="text-lime-500" />,
            href: `/${hostname}`,
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
