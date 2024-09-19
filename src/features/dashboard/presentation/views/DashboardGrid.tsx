"use client";
import QuickLinksCard from "../components/QuickLinksCard";
import RessourceLinksCard from "../components/RessourceLinksCard";
import VisibilityManagementComponent from "../components/VisibilityManagementPanel";

export default function DashboardGrid(props: { userId: string }) {
  return (
    <div className="flex gap-4 ">
      <VisibilityManagementComponent userId={props.userId} />
      <div className="flex flex-col gap-4">
        <QuickLinksCard />
        <RessourceLinksCard userId={props.userId} />
      </div>
    </div>
  );
}
