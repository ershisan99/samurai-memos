import Editor from '@/components/editor/Editor'
import { trpc } from '@/utils/trpc'
import { NextPage } from 'next'
import { useRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import slugify from 'react-slugify'

const CreatePost: NextPage = () => {
   const { mutate } = trpc.useMutation(['createPost'])
   const [htmlContent, setHtmlContent] = useState('')
   const [title, setTitle] = useState('Post title')
   const [categoryId, setCategoryId] = useState(-1)
   //todo: add form validation
   const text = useRef('')

   return (
      <div className="prose p-6 max-w-full">
         <div className="flex justify-between">
            <ContentEditable
               className="focus:outline-none"
               html={title}
               onChange={(e) => setTitle(e.target.value)}
               tagName="h1"
            />
            <select
               required
               className="select select-primary max-w-content"
               value={categoryId}
               onChange={(e) => setCategoryId(Number(e.target.value))}
            >
               <option disabled value={-1}>
                  Select a category
               </option>
               <option value={0}>React</option>
               <option value={1}>Js</option>
               <option value={2}>Other</option>
            </select>
         </div>
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
                     categoryId,
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
