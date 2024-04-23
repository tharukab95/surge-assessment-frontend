import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions = (req: any, res: any) => {
  return {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password,
              }),
            }
          );

          const cookies = response.headers.getSetCookie();

          res.setHeader("Set-Cookie", cookies);

          const user = await response.json();

          if (user) {
            console.log("here user: ", user);
            return user;
          } else {
            return null;
          }
        },
      }),
    ],
    pages: {
      signIn: "/auth/signIn",
    },
    callbacks: {
      async jwt({ token, user }: { token: any; user: any }) {
        return { ...token, ...user };
      },
      async session({
        session,
        token,
        user,
      }: {
        session: any;
        token: any;
        user: any;
      }) {
        session.user = token as any;
        return session;
      },
    },
  };
};

export default (req: any, res: any) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
