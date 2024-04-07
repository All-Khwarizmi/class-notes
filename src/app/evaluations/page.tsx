"use client";

import useAuth from "@/core/auth/useAuth";
import Main from "../../features/template/presentation/components/Main";

export default function Page() {
  useAuth();
  return <Main />;
}
