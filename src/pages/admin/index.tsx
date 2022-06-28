import Loader from '@/components/loader/Loader'
import { trpc } from '@/utils/trpc'
import { NextPage } from 'next'
import { useState } from 'react'

const Admin: NextPage = () => {
    const client = trpc.useContext()
    const { data, isLoading } = trpc.useQuery(['category.getAll'])
    const { mutate: createCategory, isLoading: createLoading } =
        trpc.useMutation(['category.createOne'], {
            onSuccess: () => {
                client.invalidateQueries(['category.getAll'])
            },
        })
    const { mutate: deleteCategory, isLoading: deleteLoading } =
        trpc.useMutation(['category.deleteOne'], {
            onSuccess: () => {
                client.invalidateQueries(['category.getAll'])
            },
        })
    const [name, setName] = useState('')
    //todo: add form validations
    console.log(data)
    return (
        <div className="prose p-6 max-w-full">
            <div className="flex w-40 flex-col">
                <input
                    className="input input-primary max-w-content"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                />
                <button
                    className="btn btn-primary mt-4 align-self-end "
                    onClick={() => createCategory({ name })}
                >
                    add category
                </button>
            </div>
            <div>
                Categories:
                {isLoading ? (
                    <Loader />
                ) : (
                    data?.map((category) => {
                        return (
                            <div key={category.id} className="flex gap-3">
                                <div>
                                    {category.id}. {category.name}
                                </div>
                                <button
                                    onClick={() =>
                                        deleteCategory({ id: category.id })
                                    }
                                    disabled={deleteLoading}
                                >
                                    <svg
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        className="fill-base-content h-5 w-4"
                                    >
                                        <use
                                            href={`/remixicon.symbol.svg#ri-delete-bin-7-line`}
                                        />
                                    </svg>
                                </button>
                                {deleteLoading && <Loader className="w-4" />}
                            </div>
                        )
                    })
                )}
                {createLoading && <Loader />}
            </div>
        </div>
    )
}
export default Admin
