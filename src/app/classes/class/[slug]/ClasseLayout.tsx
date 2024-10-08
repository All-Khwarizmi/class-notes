import NotesServerLayer from '@/app/profile/notes/[slug]/NotesServerLayer';
import AIServerLayer from '@/app/sequences/[slug]/AIServerLayer';
import ErrorDialog from '@/core/components/common/ErrorDialog';
import LoadingSkeleton from '@/core/components/common/LoadingSkeleton';
import { TypographyH1 } from '@/core/components/common/Typography';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/core/components/ui/tabs';
import { QUERY_KEYS } from '@/core/query/ query-keys';
import checkAuthAndRedirect from '@/data-access/auth/check-and-redirect';
import { classeUsecases } from '@/features/classe/application';
import getStudents from '@/features/classe/application/adapters/actions/get-students';
import { StudentsEvaluationTableView } from '@/features/classe/presentation/components/StudentsEvaluationTableView';
import { coursUsecases } from '@/features/cours-sequence/application/usecases/cours-usecases';
import ClasseSequencesTableView from '@/features/cours-sequence/presentation/views/ClasseSequencesTableView';
import getEvaluationCompoundList from '@/features/evaluation/application/adapters/actions/get-evaluation-compound-list';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';
import React, { Suspense } from 'react';

async function ClasseLayout(props: { slug: string }) {
  const { userId } = await checkAuthAndRedirect();
  const queryClient = new QueryClient();

  const classe = await classeUsecases.getClasse({ id: props.slug });
  if (isLeft(classe)) {
    return (
      <ErrorDialog message="Une erreur s'est produite lors de la récupération des informations de la classe. Veuillez réessayer plus tard." />
    );
  }

  const queriesBulk = [
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.SEQUENCE.GET_ALL()],
      queryFn: () =>
        coursUsecases.getAllSequences({
          userId,
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
                userId={userId}
              />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent value="sequences">
          <div>
            <Suspense fallback={<LoadingSkeleton />}>
              <ClasseSequencesTableView userId={userId} classeId={props.slug} />
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
