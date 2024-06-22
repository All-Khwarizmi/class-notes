import ErrorDialog from "@/core/components/common/ErrorDialog";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import CoursesTable from "@/features/cours-sequence/presentation/components/CoursesTable";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

async function CoursesServerLayer({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key in string]: string };
}) {
  const { slug } = params;
  const { type } = searchParams;
  if (!slug || !type || (type !== "template" && type !== "sequence")) {
    return (
      <LayoutWithProps
        isError={{
          message: "Invalid params",
          code: "PRE301",
          description: "Invalid params",
        }}
      ></LayoutWithProps>
    );
  }
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const eitherCourses = await coursUsecases.getAllCoursFromSequence({
    sequenceId: slug,
    userId: authUser.right.userId,
    type ,
  });
  if (isLeft(eitherCourses)) {
    return (
      <LayoutWithProps isEmpty>
        <ErrorDialog
          message={`
        An error occurred while fetching courses. 
        `}
          code={eitherCourses.left.code}
          description={
            process.env.NODE_ENV === "development"
              ? eitherCourses.left.message
              : "An error occurred while fetching courses."
          }
        />
      </LayoutWithProps>
    );
  }
  return (
    <LayoutWithProps>
      <CoursesTable
        courses={eitherCourses.right}
        sequenceId={slug}
        userId={authUser.right.userId}
      />
    </LayoutWithProps>
  );
}

export default CoursesServerLayer;
