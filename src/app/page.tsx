"use client";
import Header from "@/components/Header";
import Image from "next/image";
import { useSession } from "@clerk/nextjs";

import ClassesTable from "@/components/ClassesTable";
export default function Home() {
  const { isSignedIn } = useSession();
  return (
    <>
      <Header />
      {isSignedIn ? (
        <ClassesTable />
      ) : (
        <section
          aria-label="Sign in message display"
          className="flex flex-col items-center justify-center h-[90vh]"
        >
          <h1 className="font-bold text-2xl">Sign in to see your classes</h1>
        </section>
      )}
    </>
  );
}
