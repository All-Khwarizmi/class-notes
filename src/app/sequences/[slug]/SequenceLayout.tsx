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
import Layout from "@/core/components/layout/Layout";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import CoursSequenceView from "@/features/cours-sequence/presentation/views/CoursSequenceView";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import NotesServerLayer from "@/app/profile/notes/[slug]/NotesServerLayer";
import CoursesServerLayer from "@/app/cours/all/[slug]/CoursesServerLayer";

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
      <LayoutWithProps
        isError={{
          message: "Invalid params",
          code: "PRE301",
          description: "Invalid params",
        }}
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
      <LayoutWithProps
        isError={{
          message: "Sequence not found",
          code: "PRE404",
          description: "Sequence not found",
        }}
      />
    );
  }
  return (
    <Tabs defaultValue="sequence">
      <div className="w-full flex justify-center">
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
