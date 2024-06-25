import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";
import Hero from "@/app/HeroSection";
import Title from "@/core/components/common/Title";
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
    useUser: () => ({ firstName: "John", lastName: "Doe" }),
  };
});

// Mock convex useMutation
vi.mock("convex-react", async () => {
  return {
    useMutation: () => ({
      mutate: async () => {},
    }),
  };
});
describe("Page", () => {
  it("should render", () => {
    render(<Title />);
    expect(screen.getAllByText("La Classe")).toBeDefined();
  });
});
