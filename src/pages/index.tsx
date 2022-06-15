import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useTheme } from 'next-themes'
const Home: NextPage = () => {
   const { data, isLoading } = trpc.useQuery(['getAllPosts'])
   const { setTheme } = useTheme()
   if (isLoading) return <p>Loading...</p>

   if (data)
      return (
         <div className="flex justify-center ali">
            {data.map((post) => {
               return (
                  <div
                     key={post.id}
                     className="card bg-primary text-primary-content w-96"
                  >
                     <div className="card-body">
                        <h1 className="card-title">{post.title}</h1>
                        <p>{post.content}</p>
                     </div>
                  </div>
               )
            })}
            <button onClick={() => setTheme('night')}>Light Mode</button>
            <button onClick={() => setTheme('dark')}>Dark Mode</button>
         </div>
      )
   return <div className="text-center">{}</div>
}

export default Home
