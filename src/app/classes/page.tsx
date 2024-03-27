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
          <header className="flex justify-end pr-4  ">
            <h1 className="font-bold text-lg py-1 px-4 dark:bg-gray-600 rounded ">
              Vos classes{" "}
            </h1>
          </header>
          <ClassesTable />
        </>
      ) : (
        <MessageFullScreen message="Chargement..." />
      )}
    </>
  );
}
