import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
const prisma = new PrismaClient()
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    secret: 'SECRET',
    callbacks: {
        session: async ({ session, user }) => {
            session.userId = user.id
            session.isAdmin = user.role === 'ADMIN'
            return Promise.resolve(session)
        },
    },
}
export default NextAuth(authOptions)
