"use client";
import Header from "@/components/Header";
import Image from "next/image";

import ClassesTable from "@/components/ClassesTable";
export default function Home() {
  return (
    <>
      <Header />
      <ClassesTable />
    </>
  );
}
