"use client";
import CustomDialog from "@/components/common/CustomDialog";
import useAuth from "@/core/auth/useAuth";
import OnboardingForm from "./OboardingForm";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/core/auth/auth-store";
import { userRepositry } from "../user/repository/user-repository";

export default function Page() {
  const [open, setOpen] = useState(false);
  useAuth();
  const { onboarding } = useAuthStore((state) => ({
    onboarding : state.onboarding,
  }));

  useEffect(() => {
    if (!onboarding) {
      setTimeout(() => setOpen(true), 3000);
    }
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <CustomDialog
        open={open}
        title={"Bienvenue !"}
        icon={undefined}
        displayButton={false}
      >
        <OnboardingForm />
      </CustomDialog>
    </div>
  );
}
