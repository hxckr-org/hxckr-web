import NextAuth, {
  GhExtendedProfile,
  NextAuthOptions,
  Session,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { githubClientID, githubClientSecret } from "@/config/process";
import { signUp } from "@/services/core/auth";

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
      if (!token?.id && account?.access_token && profile) {
        try {
          const { session_token, user_id } = await signUp({
            username: profile?.login,
            github_username: profile?.login,
            email: profile?.email,
            profile_pic_url: profile?.avatar_url,
            role: "user",
            provider: "github",
          });
          token.accessToken = session_token;
          token.user_id = user_id;
          token.github_username = profile?.login;
          token.email = profile?.email;
          token.role = "user"; // TODO: change to user role from backend when implemented
        } catch (error) {
          token.id = undefined;
          console.error(error);
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      const { accessToken, ...rest } = token;
      const defaultSessionUser = session.user;
      session.user = {
        ...rest,
        ...defaultSessionUser,
      };
      session.accessToken = accessToken as string;
      return session;
    },
  },
};

export default NextAuth(authOptions);
