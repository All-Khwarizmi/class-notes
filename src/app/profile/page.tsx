import { Suspense } from "react";
import ProfileServerLayer from "./ProfileServerLayer";
import LoadingSkeleton from "@/core/components/common/LoadingSkeleton";
export default async function Page() {
  return (
    
      <ProfileServerLayer />
  
  );
}
