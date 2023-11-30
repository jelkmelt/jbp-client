export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"],
};

// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// const role = "user";

// export default withAuth(
//   function middleware(req) {
//     if (req.nextUrl.pathname.startsWith("/dashboard") && role !== "user") {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//     if (req.nextUrl.pathname.startsWith("/blog") && role !== "admin") {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ req, token }) => {
//         return !!token;
//         // if (req.nextUrl.pathname.includes("/dashboard")) {
//         //   return !!token;
//         // }
//         // if (req.nextUrl.pathname === "/login") {
//         //   if (token) {
//         //     return NextResponse.redirect(new URL("/dashboard", req.url));
//         //   }
//         // }
//       },
//     },
//   }
// );

// export const config = {
//   matcher: ["/dashboard/:path*", "/blog/:path*"],
// };
