import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { API_URL } from "@/config";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
    // error: "/404",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const userInfo = {
          name: user.name,
          email: user.email,
          image: user.image,
          role: "user",
          LOGIN_SECRET: process.env.LOGIN_SECRET,
        };

        const url = `${API_URL}/user/login`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        });

        const data = await response.json();

        console.log("login data from backend", data);

        if (response.ok) {
          // console.log("success", data);
          user.token = data.token;
          user.id = data.id;
          user.role = data.role;

          return true;
        } else {
          // console.log("error", data);
          return false;
        }
      }

      return false;
    },

    async jwt({ token, user }) {
      if (user) {
        // console.log("jwt token", token);
        token.token = user.token;
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ token, session }) {
      if (token) {
        session.user.token = token.token;
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
