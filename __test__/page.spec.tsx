import { it, expect, describe, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";
// Mock useRouter
vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));
// Mock useSession
vi.mock("@clerk/nextjs", async () => {
  return {
    SignInButton: () => <button>Sign In</button>,
    UserButton: () => <button>User</button>,
    useSession: () => [{ user: { name: "John Doe" } }, false],
  };
});
describe("Page", () => {
  it("should render", () => {
    render(<Home />);
    expect(screen.getAllByText("ClassAI")).toBeDefined();
  });
});
