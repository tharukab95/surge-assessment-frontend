import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions = (req: any, res: any) => {
  return {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied

          const response = await fetch("http://localhost:4000/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          // const cookies = response.headers['set-cookie']
          const cookies = response.headers.getSetCookie();

          res.setHeader("Set-Cookie", cookies);

          const user = await response.json();

          if (user) {
            console.log("here user: ", user);
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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
