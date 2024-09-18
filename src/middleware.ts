import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/contact",
    "/about",
    "/sign-in",
    "/sign-up",
    "/spaces",
    "/login",
    "/spaces/classes/:slug",
    "/spaces/sequences/:slug",
    "/spaces/cours/:slug", // Updated this line
    "/spaces/complement/:slug",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
