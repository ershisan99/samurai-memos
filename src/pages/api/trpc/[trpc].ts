import { appRouter } from '@/server/routers/_app'
import { PrismaClient } from '@prisma/client'
import * as trpcNext from '@trpc/server/adapters/next'
import { createContext } from '../../../server/context'

export default trpcNext.createNextApiHandler({
   router: appRouter,
   createContext,
})
