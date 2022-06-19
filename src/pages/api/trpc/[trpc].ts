import { PrismaClient } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { z } from 'zod'
import { createContext } from './context'
import { createRouter } from './createRouter'
const prisma = new PrismaClient()
export const appRouter = createRouter()
   .query('getAllPosts', {
      async resolve({ ctx }) {
         console.log(ctx)
         return await prisma.post.findMany()
      },
   })
   .mutation('createPost', {
      input: z.object({
         title: z.string().min(5).max(100),
         content: z.string().min(5).max(10000),
         status: z.enum([
            'DRAFT',
            'PUBLISHED',
            'SUGGESTED',
            'ACCEPTED',
            'REJECTED',
         ]),
         slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/gm),
      }),
      async resolve({ input, ctx }) {
         if (!ctx.session?.userId) {
            throw new TRPCError({ code: 'UNAUTHORIZED' })
         }
         return await prisma.post.create({
            data: {
               title: input.title,
               content: input.content,
               author: { connect: { id: ctx.session?.userId as string } },
               published: false,
               status: input.status,
               slug: input.slug,
            },
         })
      },
   })

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
   router: appRouter,
   createContext,
})
