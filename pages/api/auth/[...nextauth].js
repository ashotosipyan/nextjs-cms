import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "jwt token",
      name: "email",
      type: "credentials",
      credentials: {
        username: { label: "Email", type: "text ", placeholder: "Your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3000/api", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        console.log({ res });

        if (res.status === 200) {
          const user = await res.json();
          console.log({ user });
          return { id: 1, name: user.email, email: "jsmith@example.com" };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // console.log({ session, user });
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log({ token, account });
      return token;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
  session: {
    jwt: true,
  },
});
