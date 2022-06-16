import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'
import { useTheme } from 'next-themes'
const Home: NextPage = () => {
   const { data, isLoading } = trpc.useQuery(['getAllPosts'])
   const { setTheme } = useTheme()
   if (isLoading || !data) return <p>Loading...</p>

   return (
      <div>
         {data.map((post) => {
            return (
               <div key={post.id} className="p-10">
                  <h1 className="card-title">{post.title}</h1>
                  <p>{post.content}</p>
               </div>
            )
         })}
         <div>
            <button onClick={() => setTheme('night')}>Light Mode</button>
            <button onClick={() => setTheme('dark')}>Dark Mode</button>
         </div>
      </div>
   )
}

export default Home
