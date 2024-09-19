import React, { Suspense } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/components/ui/tabs";
import NotesServerLayer from "./notes/[slug]/NotesServerLayer";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { profileUseCases } from "@/features/profile/application/usecases/profile-usecases";
import UserProfile from "@/features/profile/presentation/views/UserProfile";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
async function ProfileLayout() {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    console.error(JSON.stringify(authUser.left));
    redirect("/");
  }
  const user = await profileUseCases.getUser({
    userId: authUser.right.userId,
  });
  if (isLeft(user)) {
    redirect("/");
  }

  return (
    <Tabs defaultValue="profile" className="py-8">
      <div className="w-full flex justify-center">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="profile">
        <Suspense fallback={<LoadingSkeleton />}>
          <UserProfile user={user.right} />
        </Suspense>
      </TabsContent>
      <TabsContent value="notes">
        <Suspense fallback={<LoadingSkeleton />}>
          <NotesServerLayer type="profile" slug={authUser.right.userId} />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}

export default ProfileLayout;
