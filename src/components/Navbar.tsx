import { signIn, signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { CgProfile } from 'react-icons/cg'
import Loader from './loader/Loader'

const ThemeItem = ({ name }: { name: string }) => {
    const { theme, setTheme } = useTheme()
    return (
        <div
            className={`overflow-hidden rounded-lg outline-2 outline-offset-2 outline-base-content ${
                theme === name ? 'outline' : ''
            }`}
        >
            <div
                onClick={() => setTheme(name)}
                data-theme={name}
                className="w-full cursor-pointer bg-base-100 font-sans text-base-content"
            >
                <div className="grid grid-cols-5 grid-rows-3">
                    <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                        <div className="flex-grow text-sm font-bold">
                            {name}
                        </div>
                        <div className="flex flex-shrink-0 flex-wrap gap-1">
                            <div className="w-2 rounded bg-primary"></div>
                            <div className="w-2 rounded bg-secondary"></div>
                            <div className="w-2 rounded bg-accent"></div>
                            <div className="w-2 rounded bg-neutral"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SelectTheme = () => {
    return (
        <div className="dropdown-end dropdown">
            <div tabIndex={0} className="btn btn-ghost gap-1 normal-case">
                <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    ></path>
                </svg>
                <span className="hidden md:inline">Theme</span>
                <svg
                    width="12px"
                    height="12px"
                    className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                >
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </div>
            <div
                tabIndex={0}
                className="dropdown-content rounded-t-box rounded-b-box top-px mt-16 h-[70vh] max-h-96 w-52 overflow-y-auto bg-base-200 text-base-content shadow-2xl"
            >
                <div className="grid grid-cols-1 gap-3 p-3">
                    {[
                        'light',
                        'dark',
                        'cupcake',
                        'bumblebee',
                        'emerald',
                        'corporate',
                        'synthwave',
                        'retro',
                        'cyberpunk',
                        'valentine',
                        'halloween',
                        'garden',
                        'forest',
                        'aqua',
                        'lofi',
                        'pastel',
                        'fantasy',
                        'wireframe',
                        'black',
                        'luxury',
                        'dracula',
                        'cmyk',
                        'autumn',
                        'business',
                        'acid',
                        'lemonade',
                        'night',
                        'coffee',
                        'winter',
                    ].map((name) => (
                        <ThemeItem key={name} name={name} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export const Navbar = ({ children }: { children: ReactNode }) => {
    const { data: session, status } = useSession()
    const isLoading = status === 'loading'
    const isAuth = status === 'authenticated'
    const handleSigninOut = () => {
        !isLoading && isAuth ? signOut() : signIn()
    }
    return (
        <div className="drawer-mobile drawer bg-base-100">
            <input id="drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <nav className="navbar sticky top-0 z-30 h-16 w-full bg-base-100 bg-opacity-90 text-base-content backdrop-blur transition-all duration-100">
                    <div className="flex-1">
                        <span
                            className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
                            data-tip="Menu"
                        >
                            <label
                                htmlFor="drawer"
                                className="btn btn-square btn-ghost drawer-button lg:hidden"
                            >
                                <svg
                                    className="swap-off fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                                </svg>
                            </label>
                        </span>
                    </div>
                    <div className="flex-none gap-2">
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Search"
                                className="input input-bordered"
                            />
                        </div>
                        <SelectTheme />
                        <div className="dropdown-end dropdown">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle"
                            >
                                <div className="w-10 rounded-full">
                                    {isLoading ? (
                                        <Loader />
                                    ) : session?.user?.image ? (
                                        <Image
                                            className="avatar w-10 rounded-full"
                                            src={session.user.image}
                                            alt="profile"
                                            layout="fill"
                                        />
                                    ) : (
                                        <CgProfile
                                            className="w-10"
                                            size="2rem"
                                        />
                                    )}
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
                            >
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li>
                                    <a>Settings</a>
                                </li>
                                <li>
                                    <button onClick={handleSigninOut}>
                                        {session?.user ? 'Logout' : 'Sign In'}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="drawer" className="drawer-overlay"></label>
                <aside className="w-80 bg-base-200">
                    <div className="sticky top-0 z-20 flex items-center gap-2 bg-base-200 bg-opacity-90 px-4 py-2 backdrop-blur">
                        <Link href={'/'}>
                            <a className="flex-0 btn btn-ghost px-3 normal-case">
                                <div className="inline-flex text-3xl text-primary transition-all duration-200">
                                    Samurai Memos
                                </div>
                            </a>
                        </Link>
                    </div>
                    <ul className="menu overflow-y-auto p-4 text-base-content">
                        <li>
                            <Link href="/posts">Posts</Link>
                        </li>
                        <li>
                            <Link href="/posts/create">Create post</Link>
                        </li>
                        <li>
                            <Link href="/admin">Admin</Link>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    )
}
