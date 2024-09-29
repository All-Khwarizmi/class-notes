import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/contact',
    '/about',
    '/sign-in',
    '/sign-up',
    '/spaces',
    '/login',
    '/pricing',
    '/privacy-policy',
    '/terms',
    '/security',
    '/legal',
    '/cookies',
    '/about',
    '/spaces/classes/:slug',
    '/blog',
    '/blog/article/:slug',
    '/spaces/sequences/:slug',
    '/spaces/cours/:slug', // Updated this line
    '/spaces/complement/:slug',
  ],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
