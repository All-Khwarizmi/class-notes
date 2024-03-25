"use client";
import { useSession } from "@clerk/nextjs";
import ClassesTable from "@/app/classes/ClassesTable";
import MessageFullScreen from "@/components/MessageFullScreen";

export default function Home() {
  const { isSignedIn } = useSession();
  return (
    <>
      {isSignedIn ? (
        <>
          <h1 className="text-3xl font-bold text-center mt-8">Vos classes</h1>

          <ClassesTable />
        </>
      ) : (
        <MessageFullScreen message="Chargement..." />
      )}
    </>
  );
}
