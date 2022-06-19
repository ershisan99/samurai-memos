import { RenderHtml } from '@/components/RenderHtml'
import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'

const Home: NextPage = () => {
   const { data, isLoading } = trpc.useQuery(['getAllPosts'])
   const { mutate } = trpc.useMutation(['createPost'])
   if (isLoading || !data) return <p>Loading...</p>

   return (
      <div className="p-10 prose">
         <h1>Home</h1>
         <button
            onClick={() =>
               mutate({
                  title: 'Hello',
                  content: '<p>Here is some content for you</p>',
                  status: 'PUBLISHED',
                  slug: 'hello-post',
               })
            }
         >
            haha
         </button>
         {data.map((post) => {
            return (
               <div key={post.id} className="p-10">
                  <RenderHtml html={post.content} title={post.title} />

                  <>
                     <p>status: {post.status}</p>
                     <p>created: {post.createdAt?.toLocaleString()}</p>
                  </>
               </div>
            )
         })}
      </div>
   )
}

export default Home
