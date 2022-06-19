import Editor from '@/components/editor/Editor'
import { trpc } from '@/utils/trpc'
import { useRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import slugify from 'react-slugify'

const CreatePost = () => {
   const { mutate } = trpc.useMutation(['createPost'])
   const [htmlContent, setHtmlContent] = useState('')
   const [title, setTitle] = useState('Post title')
   const text = useRef('')

   return (
      <div className="prose p-6 max-w-full">
         <ContentEditable
            className="focus:outline-none"
            html={title}
            onChange={(e) => setTitle(e.target.value)}
            tagName="h1"
         />
         {title}
         <Editor htmlContent={htmlContent} setHtmlContent={setHtmlContent} />
         <div className="flex w-full justify-end">
            <button
               className="btn btn-primary mt-4 align-self-end "
               onClick={() =>
                  mutate({
                     title: title,
                     content: htmlContent,
                     status: 'PUBLISHED',
                     slug: slugify(title),
                  })
               }
            >
               add post
            </button>
         </div>
      </div>
   )
}
export default CreatePost
