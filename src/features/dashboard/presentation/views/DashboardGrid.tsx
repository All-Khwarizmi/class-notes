"use client";
import QuickLinksCard from "../components/QuickLinksCard";
import RessourceLinksCard from "../components/RessourceLinksCard";
import VisibilityManagementComponent from "../components/VisibilityManagementPanel";

export default function DashboardGrid(props: { userId: string }) {
  return (
    <div className="flex flex-col w-full min-h-screen ">
      <main className="flex-1 grid gap-4 p-4 md:p-6 lg:grid-cols-3 xl:grid-cols-4">
        <VisibilityManagementComponent userId={props.userId} />
        <QuickLinksCard />
        <RessourceLinksCard userId={props.userId} />
      </main>
    </div>
  );
}
