import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FC } from 'react'
import { MenuBar } from './MenuBar'
type Props = {
    htmlContent: string
    setHtmlContent: (htmlContent: string) => void
}

const Tiptap: FC<Props> = ({ htmlContent, setHtmlContent }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: htmlContent,
        onUpdate: ({ editor }) => {
            setHtmlContent(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'm-5 focus:outline-none w-full h-full',
            },
        },
        autofocus: true,
    })

    return (
        <div className="flex flex-col min-h-96 border-2 no-prose">
            {editor && <MenuBar editor={editor} />}
            <EditorContent
                editor={editor}
                className="no-prose flex flex-1 py-4 px-5 "
            />
        </div>
    )
}

export default Tiptap
