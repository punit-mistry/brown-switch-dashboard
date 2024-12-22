// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublic = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
])
// const isProtected = createRouteMatcher([
//   '/dashboard',
//   '/invoices/:invoiceId',
//   '/invoices/new'
// ])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublic(request)) await auth.protect()
})
export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|tsx|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};