import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import getStudents from "@/features/classe/application/adapters/actions/get-students";
import { StudentsEvaluationTableView } from "@/features/classe/presentation/components/StudentsEvaluationTableView";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import getEvaluationCompoundList from "@/features/evaluation/application/adapters/actions/get-evaluation-compound-list";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/components/ui/tabs";
import Layout from "@/core/components/layout/Layout";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import ClasseSequencesServerLayer from "../../sequences/[slug]/ClasseSequencesServerLayer";
import NotesServerLayer from "@/app/profile/notes/[slug]/NotesServerLayer";
import { QUERY_KEYS } from "@/core/query/ query-keys";
import ClasseSequencesTableView from "@/features/cours-sequence/presentation/views/ClasseSequencesTableView";
import { classeUsecases } from "@/features/classe/application";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import { TypographyH1 } from "@/core/components/common/Typography";
import AIServerLayer from "@/app/sequences/[slug]/AIServerLayer";
async function ClasseLayout(props: { slug: string }) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }

  const queryClient = new QueryClient();

  const queriesBulk = [
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.SEQUENCE.GET_ALL()],
      queryFn: () =>
        coursUsecases.getAllSequences({
          userId: authUser.right.userId,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.CLASSE.CLASSE_SEQUENCES_GET_ALL()],
      queryFn: () =>
        coursUsecases.getClasseSequences({
          classeId: props.slug,
        }),
    }),

    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.EVALUATIONS.COMPOUND_GET_ALL()],
      queryFn: () =>
        getEvaluationCompoundList({
          classeId: props.slug,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.STUDENT.GET_ALL()],
      queryFn: () =>
        getStudents({
          classeId: props.slug,
        }),
    }),
  ];
  const classe = await classeUsecases.getClasse({ id: props.slug });
  if (isLeft(classe)) {
    return (
      <ErrorDialog message="Une erreur s'est produite lors de la récupération des informations de la classe. Veuillez réessayer plus tard." />
    );
  }

  await Promise.allSettled(queriesBulk);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Tabs defaultValue="classe" className="px-4">
        <div className="w-full  items-center justify-between flex gap-8 py-4">
          <TypographyH1 text={classe.right.name} />
          <TabsList>
            <TabsTrigger value="classe">Classe</TabsTrigger>
            <TabsTrigger value="sequences">Sequences</TabsTrigger>

            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="ai">AI</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="classe">
          <div>
            <Suspense fallback={<LoadingSkeleton />}>
              <StudentsEvaluationTableView
                classeId={props.slug}
                userId={authUser.right.userId}
              />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent value="sequences">
          <div>
            <Suspense fallback={<LoadingSkeleton />}>
              <ClasseSequencesTableView
                userId={authUser.right.userId}
                classeId={props.slug}
              />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent value="notes">
          <div>
            <Suspense fallback={<LoadingSkeleton />}>
              <NotesServerLayer type="class" slug={props.slug} />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent value="ai">
          <div>
            <Suspense fallback={<LoadingSkeleton />}>
              <AIServerLayer />
            </Suspense>
          </div>
        </TabsContent>
      </Tabs>
    </HydrationBoundary>
  );
}

export default ClasseLayout;
