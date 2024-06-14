import { authMiddleware } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

/* 
https://nextjs.org/docs/app/building-your-application/authentication
*/

export default authMiddleware({
  publicRoutes: ["/", "/contact", "/about", "/sign-in", "/sign-up", "/spaces"],
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
