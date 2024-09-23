import React, { Suspense } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/core/components/ui/tabs";
import NotesServerLayer from "./notes/[slug]/NotesServerLayer";
import UserProfile from "@/features/profile/presentation/views/UserProfile";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
import NotFound from "../not-found";
import checkAuthAndRedirect from "@/data-access/auth/check-and-redirect";
import { getCurrentUser } from "@/data-access/user/get-current-user";
import { isNone,  } from "fp-ts/lib/Option";
async function ProfileLayout() {
  const { userId } = await checkAuthAndRedirect();

  const user = await getCurrentUser(userId);

  //! TODO: @LOGIC
  if (isNone(user)) {
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
          <UserProfile user={user.value} />
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
