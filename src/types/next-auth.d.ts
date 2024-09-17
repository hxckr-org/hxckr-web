import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    user: {
      email: string;
      github_username: string;
      role: string;
    } & DefaultSession["user"];
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    email: string;
    github_username: string;
    name: string;
  }

  interface GhExtendedProfile extends Profile {
    id: string;
    email: string;
    login: string;
    avatar_url: string;
    [key]?: string;
  }
}
