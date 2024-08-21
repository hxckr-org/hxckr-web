import NextAuth, {
  GhExtendedProfile,
  NextAuthOptions,
  Session,
  User,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";

import { githubClientID, githubClientSecret } from "@/config/process";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: githubClientID,
      clientSecret: githubClientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, account, ...response }) {
      const profile = response.profile as GhExtendedProfile | undefined;
      if (account) {
        token.accessToken = account.access_token;
        token.github_username = profile?.login;
      }
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
        session.user.github_username = token.github_username as string;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
