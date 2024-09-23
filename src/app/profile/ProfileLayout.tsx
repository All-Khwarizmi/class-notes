import React, { Suspense } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/components/ui/tabs";
import NotesServerLayer from "./notes/[slug]/NotesServerLayer";
import { profileUseCases } from "@/features/profile/application/usecases/profile-usecases";
import UserProfile from "@/features/profile/presentation/views/UserProfile";
import { isLeft } from "fp-ts/lib/Either";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import NotFound from "../not-found";
import checkAuthAndRedirect from "@/data-access/auth/check-and-redirect";
async function ProfileLayout() {
  const { userId } = await checkAuthAndRedirect();

  const user = await profileUseCases.getUser({
    userId,
  });

  //! TODO: @LOGIC
  if (isLeft(user)) {
    return <NotFound />;
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
          <NotesServerLayer type="profile" slug={userId} />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}

export default ProfileLayout;
