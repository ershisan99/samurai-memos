/**
 * This file contains the root router of your tRPC-backend
 */
import { createRouter } from '../createRouter'
import { postRouter } from './post'
import superjson from 'superjson'

export const appRouter = createRouter()
   .transformer(superjson)
   .merge('post.', postRouter)

export type AppRouter = typeof appRouter
