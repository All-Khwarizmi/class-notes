"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/YOdg8xf5YDC
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */


import SequencesCard from "../components/SequencesCard";
import QuickLinksCard from "../components/QuickLinksCard";
import RessourceLinksCard from "../components/RessourceLinksCard";
import VisibilityManagementCard from "../components/VisibilityMangementCard";

export default function DashboardGrid(props: { userId: string }) {
  return (
    <div className="flex flex-col w-full min-h-screen ">
      <main className="flex-1 grid gap-4 p-4 md:p-6 lg:grid-cols-3 xl:grid-cols-4">
        <SequencesCard />
        <QuickLinksCard />
        <RessourceLinksCard
          userId={props.userId}
        />
        <VisibilityManagementCard />
      </main>
    </div>
  );
}
