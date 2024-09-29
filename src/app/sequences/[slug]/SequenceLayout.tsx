import CoursesServerLayer from '@/app/cours/all/[slug]/CoursesServerLayer';
import NotesServerLayer from '@/app/profile/notes/[slug]/NotesServerLayer';
import ErrorDialog from '@/core/components/common/ErrorDialog';
import LoadingSkeleton from '@/core/components/common/LoadingSkeleton';
import { TypographyH3 } from '@/core/components/common/Typography';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/core/components/ui/tabs';
import checkAuthAndRedirect from '@/data-access/auth/check-and-redirect';
import { authUseCases } from '@/features/auth/application/usecases/auth-usecases';
import { coursUsecases } from '@/features/cours-sequence/application/usecases/cours-usecases';
import CoursSequenceView from '@/features/cours-sequence/presentation/views/CoursSequenceView';
import { isLeft } from 'fp-ts/lib/Either';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import AIServerLayer from './AIServerLayer';

async function SequenceLayout(props: {
  slug: string;
  type?: 'template' | 'sequence';
}) {
  //! TODO: @PARAMS
  if (
    !props.slug ||
    !props.type ||
    (props.type !== 'template' && props.type !== 'sequence')
  ) {
    return (
      <ErrorDialog
        message="Invalid params"
        code="PRE301"
        description="Invalid params"
      />
    );
  }
  const { userId } = await checkAuthAndRedirect();

  //! TODO: @DATA-ACCESS
  const eitherSequence = await coursUsecases.getSingleSequence({
    userId,
    sequenceId: props.slug,
    type: props.type,
  });
  if (isLeft(eitherSequence)) {
    return (
      <ErrorDialog
        message={`
      An error occurred while fetching sequence. 
    `}
        code={eitherSequence.left.code}
        description={eitherSequence.left.message}
      />
    );
  }
  return (
    <Tabs defaultValue="sequence" className=" px-4 space-y-8">
      <div className="w-full flex  items-center justify-between  ">
        <div className="flex w-full  gap-4 justify-end">
          <TabsList>
            <TabsTrigger value="sequence">Sequence</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="ai">AI</TabsTrigger>
          </TabsList>
        </div>
      </div>
      <TabsContent value="sequence">
        <div>
          <Suspense fallback={<LoadingSkeleton />}>
            <CoursSequenceView
              sequence={eitherSequence.right}
              userId={userId}
              type="sequence"
              sequenceType={props.type}
            />
          </Suspense>
        </div>
      </TabsContent>
      <TabsContent value="courses">
        <div>
          <Suspense fallback={<LoadingSkeleton />}>
            <CoursesServerLayer
              params={{ slug: props.slug }}
              searchParams={{ type: props.type }}
            />
          </Suspense>
        </div>
      </TabsContent>
      <TabsContent value="notes">
        <div>
          <Suspense fallback={<LoadingSkeleton />}>
            <NotesServerLayer type="sequence" slug={props.slug} />
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
  );
}

export default SequenceLayout;
