import * as trpc from '@trpc/server'
import superjson from 'superjson'

import { Context } from './context'

/**
 * Helper function to create a router with context
 */
export function createRouter() {
   return trpc.router<Context>().transformer(superjson)
}
