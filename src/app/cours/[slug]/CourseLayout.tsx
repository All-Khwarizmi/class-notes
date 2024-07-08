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

async function CourseLayout(props: { slug: string }) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const eitherCours = await coursUsecases.getSingleCours({
    userId: authUser.right.userId,
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
    <Layout>
      <Tabs defaultValue="course">
        <div className="w-full flex justify-center">
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
                userId={authUser.right.userId}
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
    </Layout>
  );
}

export default CourseLayout;
