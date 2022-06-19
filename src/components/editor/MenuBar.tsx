import React, { FC, Fragment } from 'react'

import { MenuItem } from './MenuItem'
import { Editor } from '@tiptap/react'
type Props = {
   editor: Editor
}
export const MenuBar: FC<Props> = ({ editor }) => {
   const items = [
      {
         icon: 'bold',
         title: 'Bold',
         action: () => editor.chain().focus().toggleBold().run(),
         isActive: () => editor.isActive('bold'),
      },
      {
         icon: 'italic',
         title: 'Italic',
         action: () => editor.chain().focus().toggleItalic().run(),
         isActive: () => editor.isActive('italic'),
      },
      {
         icon: 'strikethrough',
         title: 'Strike',
         action: () => editor.chain().focus().toggleStrike().run(),
         isActive: () => editor.isActive('strike'),
      },
      {
         icon: 'code-view',
         title: 'Code',
         action: () => editor.chain().focus().toggleCode().run(),
         isActive: () => editor.isActive('code'),
      },

      {
         type: 'divider',
      },
      {
         icon: 'h-2',
         title: 'Heading 2',
         action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
         isActive: () => editor.isActive('heading', { level: 2 }),
      },
      {
         icon: 'h-3',
         title: 'Heading 3',
         action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
         isActive: () => editor.isActive('heading', { level: 3 }),
      },
      {
         icon: 'h-4',
         title: 'Heading 4',
         action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
         isActive: () => editor.isActive('heading', { level: 4 }),
      },
      {
         icon: 'paragraph',
         title: 'Paragraph',
         action: () => editor.chain().focus().setParagraph().run(),
         isActive: () => editor.isActive('paragraph'),
      },
      {
         icon: 'list-unordered',
         title: 'Bullet List',
         action: () => editor.chain().focus().toggleBulletList().run(),
         isActive: () => editor.isActive('bulletList'),
      },
      {
         icon: 'list-ordered',
         title: 'Ordered List',
         action: () => editor.chain().focus().toggleOrderedList().run(),
         isActive: () => editor.isActive('orderedList'),
      },
      {
         icon: 'code-box-line',
         title: 'Code Block',
         action: () => editor.chain().focus().toggleCodeBlock().run(),
         isActive: () => editor.isActive('codeBlock'),
      },
      {
         type: 'divider',
      },
      {
         icon: 'double-quotes-l',
         title: 'Blockquote',
         action: () => editor.chain().focus().toggleBlockquote().run(),
         isActive: () => editor.isActive('blockquote'),
      },
      {
         icon: 'separator',
         title: 'Horizontal Rule',
         action: () => editor.chain().focus().setHorizontalRule().run(),
      },
      {
         type: 'divider',
      },
      {
         icon: 'text-wrap',
         title: 'Hard Break',
         action: () => editor.chain().focus().setHardBreak().run(),
      },
      {
         icon: 'format-clear',
         title: 'Clear Format',
         action: () =>
            editor.chain().focus().clearNodes().unsetAllMarks().run(),
      },
      {
         type: 'divider',
      },
      {
         icon: 'arrow-go-back-line',
         title: 'Undo',
         action: () => editor.chain().focus().undo().run(),
      },
      {
         icon: 'arrow-go-forward-line',
         title: 'Redo',
         action: () => editor.chain().focus().redo().run(),
      },
   ]

   return (
      <div className="flex flex-wrap items-center border-b-2 p-[0.25rem]">
         {items.map((item, index) => (
            <Fragment key={index}>
               {item.type === 'divider' ? (
                  <div className="bg-base-content h-[1.25rem] ml-[0.5rem] mr-[0.75rem] w-[2px]" />
               ) : (
                  <MenuItem {...item} />
               )}
            </Fragment>
         ))}
      </div>
   )
}
