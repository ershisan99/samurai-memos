import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'
import { useTheme } from 'next-themes'
import parse, { domToReact, Element } from 'html-react-parser'

const Home: NextPage = () => {
   const { data, isLoading } = trpc.useQuery(['getAllPosts'])
   const { setTheme } = useTheme()
   if (isLoading || !data) return <p>Loading...</p>
   const transform = (html: string) =>
      parse(html, {
         replace: (node) => {
            if (
               node instanceof Element &&
               node.type === 'tag' &&
               node.name === 'pre'
            ) {
               return (
                  <pre className="language-js">{domToReact(node.children)}</pre>
               )
            }
            if (
               node instanceof Element &&
               node.type === 'tag' &&
               node.name === 'code'
            ) {
               console.log(node)
               return (
                  <pre className="language-js">{domToReact(node.children)}</pre>
               )
            }
         },
      })
   return (
      <div>
         {data.map((post) => {
            return (
               <div key={post.id} className="p-10 prose">
                  <h1 className="card-title">{post.title}</h1>

                  <div>{transform(post.content)}</div>
               </div>
            )
         })}
      </div>
   )
}

export default Home
