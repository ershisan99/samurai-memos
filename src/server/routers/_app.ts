import { categoryRouter } from './category'
/**
 * This file contains the root router of your tRPC-backend
 */
import { createRouter } from '../createRouter'
import { postRouter } from './post'
import superjson from 'superjson'

export const appRouter = createRouter()
    .transformer(superjson)
    .merge('post.', postRouter)
    .merge('category.', categoryRouter)

export type AppRouter = typeof appRouter
