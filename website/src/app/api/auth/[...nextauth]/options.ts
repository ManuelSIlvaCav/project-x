import { CustomError } from "@/app/lib/interfaces/Error";
import {
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
  trigger?: "signIn" | "signUp" | "update";
  isNewUser?: boolean | undefined;
  session?: any;
}) => {
  const { token, user, account } = params;
  if (account?.type === "credentials") {
    token.accessToken = user.accessToken;
    token.userId = user.userId;
    token.generalRole = user.generalRole;
    if (user.roles && Array.isArray(user.roles)) {
      token.roles = user.roles;
    }
  }
  return token;
};

callbacks.session = async ({ session, token }) => {
  session.user.accessToken = token.accessToken;
  session.user.userId = token.userId;
  session.user.generalRole = token.generalRole;
  return session;
};

callbacks.signIn = async ({ user, account, profile, email, credentials }) => {
  if (user?.errorMessage) {
    throw new Error(user.errorMessage ?? "Error signing in");
  }
  return true;
};

const providers = [
  CredentialsProvider({
    credentials: {
      email: { label: "email", type: "email" },
      password: { label: "password", type: "password" },
      generalRole: { label: "generalRole", type: "text" },
    },
    async authorize(credentials, req): Promise<User | null | any> {
      //Sorry for the any, but I'm not sure what the return type should be authorize gets crazy
      try {
        console.log("credentials", credentials);
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(`${process.env.API_PATH}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errorData: CustomError & { errors?: { message: string }[] } =
            await res.json();
          const errorMessage =
            errorData?.errors?.[0]?.message ?? "Error signing in";
          console.log("Error on authorize", {
            errorData: JSON.stringify(errorData),
            errorMessage,
          });
          return { errorMessage };
        }

        const loginData: {
          token: string;
          user_id: string;
          general_role: string;
        } = await res.json();

        console.log("loginData", loginData);

        if (loginData?.token) {
          const sessionUser = {
            id: loginData.user_id,
            email: credentials?.email,
            accessToken: loginData.token,
            userId: loginData.user_id,
            generalRole: loginData?.general_role,
            name: undefined,
            image: undefined,
          };

          return sessionUser;
        }

        return null;
      } catch (error: any) {
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

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers,
  pages,
  callbacks,
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
