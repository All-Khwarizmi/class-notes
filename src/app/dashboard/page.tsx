"use client";
import CustomDialog from "@/core/components/common/CustomDialog";
import useAuth from "@/core/auth/useAuth";
import OnboardingForm from "./OboardingForm";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/core/auth/auth-store";
import { userRepositry } from "@/features/user/application/repository/user-repository";

export default function Page() {
  const [open, setOpen] = useState(false);
  useAuth();
  const { user, isLoading } = userRepositry.useGetUser();
  const { onboarding } = useAuthStore((state) => ({
    onboarding: state.onboarding,
  }));

  useEffect(() => {
    console.log({ user, isLoading, onboarding });
    if (!isLoading && !user && !onboarding) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [user, isLoading, onboarding]);
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
