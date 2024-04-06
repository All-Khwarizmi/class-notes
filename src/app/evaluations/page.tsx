"use client";

import useAuth from "@/core/auth/useAuth";
import Main from "../../features/evaluations/presentation/components/Main";

export default function Page() {
  useAuth();
  return <Main />;
}
