import { PrismaClient } from '@prisma/client'
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { resolve } from 'path'
import superjson from 'superjson'
import { z } from 'zod'
const prisma = new PrismaClient()
export const appRouter = trpc
   .router()
   .transformer(superjson)
   .query('getAllPosts', {
      async resolve() {
         return await prisma.post.findMany()
      },
   })

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
   router: appRouter,
   createContext: () => null,
})
