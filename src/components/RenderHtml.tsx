import { isText } from 'domhandler'
import parse, { Element } from 'html-react-parser'
import Link from 'next/link'
import React from 'react'
import { FC } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism'

type PropsType = {
    html: string
    title: string
    slug: string
}
//todo: scroll to top on mount
export const RenderHtml: FC<PropsType> = ({ html, title, slug }) => {
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
                node.children[0] &&
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
    return (
        <>
            <h1 className="group">
                {parse(title)}{' '}
                <Link href={`#${slug}`}>
                    <a className="opacity-20 hover:opacity-60 no-underline hidden group-hover:inline-block">
                        #
                    </a>
                </Link>
            </h1>
            <div className="prose">{parsed}</div>
        </>
    )
}
