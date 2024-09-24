import React from "react";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import CoursSequenceView from "@/features/cours-sequence/presentation/views/CoursSequenceView";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/components/ui/tabs";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import Layout from "@/core/components/layout/Layout";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import ComplementsServerLayer from "@/app/cours/complements/[slug]/ComplementsServerLayer";
import { TypographyH3 } from "@/core/components/common/Typography";
import checkAuthAndRedirect from "@/data-access/auth/check-and-redirect";

async function CourseLayout(props: { slug: string }) {
  const { userId } = await checkAuthAndRedirect();

  const eitherCours = await coursUsecases.getSingleCours({
    userId,
    coursId: props.slug,
  });
  if (isLeft(eitherCours)) {
    return (
      <ErrorDialog
        message={`
        There was an error while fetching the course.
        Please try again later.
        ${eitherCours.left.message}
        Code: ${eitherCours.left.code}
        `}
      />
    );
  }
  return (
    <Tabs defaultValue="course" className=" px-4 space-y-8">
      <div className="w-full flex justify-end">
        <TabsList>
          <TabsTrigger value="course">Course</TabsTrigger>
          <TabsTrigger value="complements">Complements</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="course">
        <div>
          <Suspense fallback={<LoadingSkeleton />}>
            <CoursSequenceView
              cours={eitherCours.right}
              userId={userId}
              type="cours"
            />
          </Suspense>
        </div>
      </TabsContent>
      <TabsContent value="complements">
        <div>
          <Suspense fallback={<LoadingSkeleton />}>
            <ComplementsServerLayer slug={props.slug} />
          </Suspense>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default CourseLayout;
