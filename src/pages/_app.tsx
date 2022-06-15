import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { withTRPC } from '@trpc/next'
import { AppRouter } from './api/trpc/[trpc]'
import superjson from 'superjson'
import { ThemeProvider } from 'next-themes'
function MyApp({ Component, pageProps }: AppProps) {
   return (
      <ThemeProvider>
         <Component {...pageProps} />
      </ThemeProvider>
   )
}

export default withTRPC<AppRouter>({
   config({ ctx }) {
      /**
       * If you want to use SSR, you need to use the server's full URL
       * @link https://trpc.io/docs/ssr
       */
      const url = process.env.VERCEL_URL
         ? `https://${process.env.VERCEL_URL}/api/trpc`
         : 'http://localhost:3000/api/trpc'

      return {
         url,
         transformer: superjson,
         /**
          * @link https://react-query.tanstack.com/reference/QueryClient
          */
         // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      }
   },
   /**
    * @link https://trpc.io/docs/ssr
    */
   ssr: false,
})(MyApp)
