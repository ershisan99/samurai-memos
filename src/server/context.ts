import { PrismaClient } from '@prisma/client'
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { getServerSession } from 'next-auth'

import { authOptions as nextAuthOptions } from '../pages/api/auth/[...nextauth]'

const prisma = new PrismaClient({
   log:
      process.env.NODE_ENV === 'development'
         ? ['query', 'error', 'warn']
         : ['error'],
})
export const createContext = async (
   opts?: trpcNext.CreateNextContextOptions
) => {
   const req = opts?.req
   const res = opts?.res
   const session = opts && (await getServerSession(opts, nextAuthOptions))

   return {
      req,
      res,
      session,
   }
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
