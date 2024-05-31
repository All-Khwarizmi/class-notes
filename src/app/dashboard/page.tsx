"use client";
import CustomDialog from "@/core/components/common/CustomDialog";
import OnboardingForm from "./OboardingForm";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/core/auth/auth-store";
import useAuth from "@/core/auth/useAuth";
import { userRepositry } from "@/features/user/application/repository/user-repository";

export default function Page() {
  const [open, setOpen] = useState(false);
  useAuth();
  const { onboarding, user, setOnboarding } = useAuthStore((state) => ({
    onboarding: state.onboarding,
    user: state.user,
    setOnboarding: state.setOnboarding,
  }));
  const { user: userFromDb, isLoading } = userRepositry.useGetUser();

  useEffect(() => {
    console.log({ user, onboarding });
    if (!user || !onboarding) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [user, onboarding]);

  useEffect(() => {
    if (!isLoading && !userFromDb) {
      setOnboarding(false);
    }
  }, [userFromDb, isLoading]);
  return (
    <section data-testid="dashboard">
      <h1>Dashboard</h1>
      <CustomDialog
        open={open}
        title={"Bienvenue !"}
        icon={undefined}
        displayButton={false}
      >
        <OnboardingForm />
      </CustomDialog>
    </section>
  );
}
