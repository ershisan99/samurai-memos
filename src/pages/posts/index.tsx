import Loader from '@/components/loader/Loader'
import { RenderHtml } from '@/components/RenderHtml'
import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'

const Posts: NextPage = () => {
    const { data, isLoading } = trpc.useQuery(['post.getAll'])

    if (isLoading || !data)
        return (
            <div className="flex h-screen items-center justify-center ">
                <Loader className="h-12 w-12" />
            </div>
        )

    return (
        <div className="p-10 prose">
            {data.map((post) => {
                return (
                    <div key={post.id} className="mb-16">
                        <RenderHtml
                            html={post.content}
                            title={post.title}
                            slug={post.slug}
                        />
                        <p>status: {post.status}</p>
                        <p>created: {post.createdAt?.toLocaleString()}</p>
                        <p>category: {post.category.name}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts
