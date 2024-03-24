"use client";
import { useSession } from "@clerk/nextjs";
import ClassesTable from "@/app/classes/ClassesTable";
import MessageFullScreen from "@/components/MessageFullScreen";

export default function Home() {
  const { isSignedIn } = useSession();
  return (
    <>
      {isSignedIn ? (
        <ClassesTable />
      ) : (
        <MessageFullScreen message="Chargement..." />
      )}
    </>
  );
}
