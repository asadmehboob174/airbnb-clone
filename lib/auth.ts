import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { nanoid } from 'nanoid'
import { prismadb } from './prismadb';
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prismadb),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (credentials == null) return null;
        // Add logic here to look up the user from the credentials supplied

        const { email, password } = credentials;

        const user = await prismadb.user.findUnique({
          where: {
            email
          }
        });

        if (!user) {
          return null;
        }

        const isMatch = bcrypt.compareSync(credentials.password, user.password)
        if (!isMatch) {
          return null;
        }

        return { id: user.id, username: user.username }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
      }
      return session;

    },
    async jwt({ token, user }) {
      const dbUser = await prismadb.user.findFirst({
        where: {
          email: token.email
        }
      });

      if (!dbUser) {
        token.id = user.id
        return token;
      }

      if (!dbUser.username) {
        prismadb.user.update({
          where: {
            id: dbUser.id
          },
          data: {
            username: nanoid(10)
          }
        })
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
      }
    },
    redirect() {
      return '/'
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const getAuthSession = () => {
  return getServerSession(authOptions)
}



