"use client";
import ClassesTable from "@/app/classes/ClassesTable";
import { useLandingRedirect } from "@/application/common/useLandingRedirect";

export default function Home() {
  useLandingRedirect();
  return <ClassesTable />;
}
