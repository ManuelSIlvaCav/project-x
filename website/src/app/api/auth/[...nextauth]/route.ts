import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      //this field is not necessary
      //unless you use the built-in form.
      //However it also gives us our "credentials" type below.

      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        try {
          console.log({ credentials });
          //verify our credentials using the route
          //we created above
          const res = await fetch(`${process.env.API_PATH}/auth/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            cache: "no-cache", //! To be removed after done testing
          });

          console.log({ res });

          if (!res.ok) return null;

          const user = await res.json();

          console.log({ user });

          if (user?.username) {
            const sessionUser: User = {
              id: user.id, // required string !!!
              name: user.username, // undefined | null | string
              email: undefined, // undefined | null | string
              image: undefined, // undefined | null | string
            };

            return sessionUser;
          }

          return null;
        } catch (error) {
          console.error({ error });
          return null;
        }
      },
    }),
  ],

  //remove this field
  //if you use the built-in form
  pages: {
    signIn: "/login", //default is /api/auth/signin
    //this will redirect us
    //to our custom login page
    //including an error searchParam
    //if there is an issue.
  },
  callbacks: {},
});

export { handler as GET, handler as POST };
