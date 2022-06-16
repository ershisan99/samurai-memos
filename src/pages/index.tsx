import { RenderHtml } from '@/components/RenderHtml'
import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'

const Home: NextPage = () => {
   const { data, isLoading } = trpc.useQuery(['getAllPosts'])
   if (isLoading || !data) return <p>Loading...</p>

   return (
      <div>
         {data.map((post) => {
            return (
               <div key={post.id} className="p-10 prose">
                  <RenderHtml html={post.content} />
               </div>
            )
         })}
      </div>
   )
}

export default Home
