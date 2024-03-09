import NextAuth, {
  Account,
  AuthOptions,
  CallbacksOptions,
  Profile,
  User,
} from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const callbacks: Partial<CallbacksOptions> = {};

callbacks.jwt = async (params: {
  token: JWT;
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile | undefined;
  trigger?: "signIn" | "signUp" | "update" | undefined;
  isNewUser?: boolean | undefined;
  session?: any;
}) => {
  const { token, user, account } = params;
  if (account?.type === "credentials") {
    token.accessToken = user.accessToken;
    token.userId = user.userId;
  }
  return token;
};

callbacks.session = async ({ session, token }) => {
  session.user.accessToken = token.accessToken;
  session.user.userId = token.userId;
  return session;
};

const providers = [
  CredentialsProvider({
    credentials: {
      email: { label: "email", type: "email" },
      password: { label: "password", type: "password" },
    },
    async authorize(credentials) {
      try {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(`${process.env.API_PATH}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) return null;

        const loginData: { token: string; userId: string } = await res.json();

        if (loginData?.token) {
          const sessionUser = {
            id: loginData.userId, // required string !!!
            name: undefined, // undefined | null | string
            email: credentials?.email, // undefined | null | string
            image: undefined, // undefined | null | string
            accessToken: loginData.token, // undefined | null | string
            userId: loginData.userId, // undefined | null | string
          };

          return sessionUser;
        }

        return null;
      } catch (error) {
        console.error("Error on authorize", { error });
        return null;
      }
    },
  }),
];

const pages = {
  signIn: "/login", //default is /api/auth/signin
  //this will redirect us
  //to our custom login page
  //including an error searchParam
  //if there is an issue.
};

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers,
  pages,
  callbacks,
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
