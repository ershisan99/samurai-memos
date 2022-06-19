import Layout from '@/components/Layout'
import { withTRPC } from '@trpc/next'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import superjson from 'superjson'
import '../styles/globals.css'
import { AppRouter } from './api/trpc/[trpc]'
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
   return (
      <SessionProvider session={session}>
         <ThemeProvider>
            <Layout>
               <Component {...pageProps} />
            </Layout>
         </ThemeProvider>
      </SessionProvider>
   )
}

export default withTRPC<AppRouter>({
   config({ ctx }) {
      /**
       * If you want to use SSR, you need to use the server's full URL
       * @link https://trpc.io/docs/ssr
       */
      console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
      const url = process.env.NEXT_PUBLIC_VERCEL_URL
         ? `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
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
