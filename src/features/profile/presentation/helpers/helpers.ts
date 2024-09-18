export function checkUserCredits(endsOn?: number, credits?: number) {
  if (checkUserSubscriptionStatus(endsOn) === "Active") {
    return "Unlimited";
  } else if (credits && credits > 0) {
    return String(credits);
  } else if (credits === 0) {
    return "No credits left";
  }
}

export function checkUserSubscriptionStatus(endsOn?: number) {
  if (!endsOn) {
    return "No subscription";
  }
  const now = new Date();
  const endsOnDate = new Date(endsOn);
  if (now < endsOnDate) {
    return "Active";
  } else {
    return "Expired";
  }
}
export function getSubjectsByEducationSystem(selectedSystem: string) {
  throw new Error("Function not implemented.");
}
