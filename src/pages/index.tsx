import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
   const { data, isLoading } = trpc.useQuery(['hello', { text: 'Andrei' }])
   if (isLoading) return <p>Loading...</p>
   if (data) return <div className="text-center">{data.greeting}</div>
   return <div className="text-center">Hello</div>
}

export default Home
