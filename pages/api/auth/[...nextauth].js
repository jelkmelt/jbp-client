import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_URL } from "@/config";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      // credentials: {},
      authorize: async (credentials) => {
        // const payload = {
        //   email: credentials.email,
        //   password: credentials.password,
        // };
        const { ...values } = credentials;

        const url = `${API_URL}/admin/login`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const user = await response.json();

        console.log("admin login", user);

        // console.log("main", url);
        // console.log("auth", user);
        // if (response.ok && user) {
        if (response.ok) {
          return user;
        } else {
          console.log("error", user);
          throw new Error(user.error);
          // throw new Error(user.text);
        }
      },
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
          console.log("success", data);
          user.token = data.token;
          user.id = data.id;
          user.role = data.role;

          // return user;
          return true;
        } else {
          // console.log("error", data);
          return false;
        }
      }

      if (account.provider === "credentials") {
        user.role = "admin";
        // user.role = user.role;

        return true;
      }

      // return true;
      return false;
    },

    async jwt({ token, user }) {
      // console.log("user", user);
      if (user) {
        token.token = user.token;
        token.id = user.id;
        token.role = user.role;
      }
      // console.log("jwt token", token);
      return token;
    },

    async session({ token, session }) {
      if (token) {
        session.user.token = token.token;
        session.user.id = token.id;
        session.user.role = token.role;
      }
      // console.log("session token", session);
      return session;
    },
  },
};

export default NextAuth(authOptions);
