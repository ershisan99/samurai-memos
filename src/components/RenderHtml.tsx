import { isText } from 'domhandler'
import parse, { Element } from 'html-react-parser'
import React from 'react'
import { FC } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism'

type PropsType = {
   html: string
}

export const RenderHtml: FC<PropsType> = ({ html }) => {
   const removedPre = html
      .replace(/<pre>/g, '')
      .replace(/<\/pre>/g, '')
      .replace(/\\n/gi, '\n')

   const parsed = parse(removedPre, {
      replace: (node) => {
         if (
            node instanceof Element &&
            node.type === 'tag' &&
            node.name === 'code' &&
            isText(node.children[0])
         ) {
            return (
               <div className="text-sm">
                  <SyntaxHighlighter language="tsx" style={nightOwl}>
                     {node.children[0].data}
                  </SyntaxHighlighter>
               </div>
            )
         }
      },
   })
   return <>{parsed}</>
}
