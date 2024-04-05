"use client";
import CustomDialog from "@/core/components/common/CustomDialog";
import OnboardingForm from "./OboardingForm";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/core/auth/auth-store";

export default function Page() {
  const [open, setOpen] = useState(false);
 
  const { onboarding, user } = useAuthStore((state) => ({
    onboarding: state.onboarding,
    user: state.user,
  }));

  useEffect(() => {
    if (!user || !onboarding) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [user, onboarding]);
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
