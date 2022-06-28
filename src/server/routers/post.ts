import { PrismaClient } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createRouter } from '../createRouter'

const prisma = new PrismaClient()
export const postRouter = createRouter()
    .query('getAll', {
        async resolve({ ctx }) {
            console.log(ctx)
            return await prisma.post.findMany({
                include: {
                    author: {
                        select: {
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                    category: {
                        select: {
                            name: true,
                            id: true,
                        },
                    },
                },
            })
        },
    })
    .mutation('createOne', {
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
            categoryId: z.number().min(0),
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
                    category: {
                        connect: {
                            id: input.categoryId,
                        },
                    },
                },
            })
        },
    })
