import React, { Suspense } from "react";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { profileUseCases } from "@/features/profile/application/usecases/profile-usecases";
import UserProfile from "@/features/profile/presentation/views/UserProfile";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import Dashboard from "@/core/components/icons/Dashboard";
import { NavItem } from "@/lib/types";
import { NotebookPen } from "lucide-react";
import LayoutWithProps from "@/core/components/layout/LayoutWithProps";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
async function ProfileServerLayer() {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const user = await profileUseCases.getUser({
    userId: authUser.right.userId,
  });
  if (isLeft(user)) {
    redirect("/login");
  }
  const notesNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Dashboard(),
    },

    {
      title: "Notes",
      href: `/profile/notes/${user.right._id}`,
      icon: <NotebookPen size={16} />,
    },
  ];
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <LayoutWithProps navItems={notesNavItems}>
        <UserProfile user={user.right} />
      </LayoutWithProps>
    </Suspense>
  );
}

export default ProfileServerLayer;
