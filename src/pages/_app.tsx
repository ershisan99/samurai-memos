import Layout from '@/components/Layout'
import { withTRPC } from '@trpc/next'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import superjson from 'superjson'
import '../styles/globals.css'
import '@/components/editor/MenuItem.css'
import '@/components/editor/MenuBar.css'
import { AppRouter } from '@/server/routers/_app'

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
    config() {
        const url = '/api/trpc'
        return {
            url,
            transformer: superjson,
        }
    },
    ssr: false,
})(MyApp)
