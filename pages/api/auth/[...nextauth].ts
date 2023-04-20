import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import { PrismaClient } from "@prisma/client";
import client from "../../../lib/prismadb";


const prisma = client
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [

    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),

    GitHubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_SECRET}`
    }),

   
    ],
    callbacks: {
      session({ session, token, user }) {
        //console.log('session', session)

        //const data = { id, name, image, email} = user as User
        const this_user: User = {
          id: user.id,
          name: user.name as string,
          email: user.email as string,
          image: user.image as string
        }
        
        
        
        session.user = this_user;
          return Promise.resolve(session)
          
        },
      },
})


