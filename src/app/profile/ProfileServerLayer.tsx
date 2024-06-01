import React from "react";
import LoadingPage from "@/core/components/common/LoadingPage";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { profileUseCases } from "@/features/profile/application/usecases/profile-usecases";
import UserProfile from "@/features/profile/presentation/views/UserProfile";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Dashboard from "@/core/components/icons/Dashboard";
import { NavItem } from "@/lib/types";
import { BookCheck, NotebookPen } from "lucide-react";
import Sidebar from "@/core/components/layout/Sidebar";
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
    <>
      <Sidebar navItems={notesNavItems} />
      <section className="h-full flex-1  overflow-x-hidden">
        <div className="h-full py-8 px-6">
          <UserProfile user={user.right} />
        </div>
      </section>
    </>
  );
}

export default ProfileServerLayer;
