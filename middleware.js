import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // const secret = process.env.NEXTAUTH_SECRET;
  // const token = await getToken({ req, secret });;
  const token = await getToken({ req });

  console.log("token from middleware", token?.role);

  const isAdmin = token?.role === "admin";
  const isUser = token?.role === "user";

  //for admin
  if (pathname.startsWith("/admin")) {
    if (pathname !== "/admin/login") {
      if (!isAdmin) {
        const adminRedirectPath =
          pathname === `/admin`
            ? `/admin/login`
            : `/admin/login?callback_url=${pathname}`;

        return NextResponse.redirect(new URL(adminRedirectPath, req.url));
      }
    } else {
      if (isAdmin) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }
  } else {
    // for user
    if (pathname !== "/login") {
      if (!isUser) {
        const userRedirectPath = `/login?callback_url=${pathname}`;

        return NextResponse.redirect(new URL(userRedirectPath, req.url));
      }
    } else {
      if (isUser) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login"],
};

// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   callbacks: {
//     authorized: ({ req, token }) => {
//       const pathname = req.nextUrl.pathname;
//       if (pathname === "/admin/login") {
//         return true;
//       }
//       if (pathname.startsWith("/admin")) {
//         return token?.role === "admin";
//       }
//       return !!token;
//     },
//   },
// });

// export const config = {
//   matcher: ["/dashboard/:path*", "/admin/:path*"],
// };

// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     const { pathname, origin } = req.nextUrl;
//     const role = req.nextauth.token.role;

//     // console.log("role", role);
//     if (pathname.startsWith("/admin")) {
//       if (pathname !== "/admin/login") {
//         if (role !== "admin") {
//           return NextResponse.redirect(new URL("/admin/login", req.url));
//         }
//       } else {
//         if (role === "admin") {
//           // return NextResponse.redirect(`${origin}/admin`);
//           return NextResponse.redirect(new URL("/admin", req.url));
//         }
//       }
//     }

//     // if (pathname.startsWith("/dashboard")) {
//     //   return NextResponse.redirect(new URL("/login", req.url));
//     // }
//     // if (
//     //   req.nextUrl.pathname.startsWith("/admin") &&
//     //   req.nextauth.role !== "admin"
//     // ) {
//     //   return NextResponse.redirect(new URL("/admin/login", req.url));
//     // }
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
//   matcher: ["/dashboard/:path*", "/admin/:path*"],
// };
