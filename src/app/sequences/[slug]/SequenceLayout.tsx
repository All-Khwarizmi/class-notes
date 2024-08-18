import { Suspense } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/components/ui/tabs";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import CoursSequenceView from "@/features/cours-sequence/presentation/views/CoursSequenceView";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import NotesServerLayer from "@/app/profile/notes/[slug]/NotesServerLayer";
import CoursesServerLayer from "@/app/cours/all/[slug]/CoursesServerLayer";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import { HeaderTypographyH1 } from "@/core/components/common/Typography";

async function SequenceLayout(props: {
  slug: string;
  type?: "template" | "sequence";
}) {
  if (
    !props.slug ||
    !props.type ||
    (props.type !== "template" && props.type !== "sequence")
  ) {
    return (
      <ErrorDialog
        message="Invalid params"
        code="PRE301"
        description="Invalid params"
      />
    );
  }
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }

  const eitherSequence = await coursUsecases.getSingleSequence({
    userId: authUser.right.userId,
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
    <Tabs defaultValue="sequence" className="py-8 px-4 ">
      <div className="w-full flex flex-col items-center gap-8 pb-8">
        <HeaderTypographyH1 text={eitherSequence.right.name} />
        <TabsList>
          <TabsTrigger value="sequence">Sequence</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="sequence">
        <div>
          <Suspense fallback={<LoadingSkeleton />}>
            <CoursSequenceView
              sequence={eitherSequence.right}
              userId={authUser.right.userId}
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
    </Tabs>
  );
}

export default SequenceLayout;
