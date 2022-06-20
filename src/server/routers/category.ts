import { PrismaClient } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createRouter } from '../createRouter'

const prisma = new PrismaClient()
export const categoryRouter = createRouter()
   .query('getAll', {
      async resolve({ ctx }) {
         console.log(ctx)
         return await prisma.category.findMany()
      },
   })
   .mutation('createOne', {
      input: z.object({
         name: z.string().min(3).max(100),
      }),
      async resolve({ input, ctx }) {
         if (!ctx.session?.userId || !ctx.session.isAdmin) {
            throw new TRPCError({ code: 'UNAUTHORIZED' })
         }
         return await prisma.category.create({
            data: {
               name: input.name,
            },
         })
      },
   })
   .mutation('deleteOne', {
      input: z.object({
         id: z.number().min(0),
      }),
      async resolve({ input, ctx }) {
         if (!ctx.session?.userId || !ctx.session.isAdmin) {
            throw new TRPCError({ code: 'UNAUTHORIZED' })
         }
         return await prisma.category.delete({
            where: {
               id: input.id,
            },
         })
      },
   })
