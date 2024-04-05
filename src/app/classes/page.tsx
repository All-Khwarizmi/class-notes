"use client";
import useAuth from "@/core/auth/useAuth";
import ClassesTable from "@/features/classe/presentation/components/ClassesTable";

export default function Home() {
  useAuth();
  return <ClassesTable />;
}
