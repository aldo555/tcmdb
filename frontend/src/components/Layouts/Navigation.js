import { Fragment } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { Menu, Popover, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import ApplicationLogo from '@/components/ApplicationLogo'
import LinkButton from '@/components/LinkButton'
import { useState} from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navigation = ({ user }) => {
    const router = useRouter()

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', current: router.pathname === '/dashboard' },
        { name: 'New Record', href: '/create-record', current: router.pathname === '/create-record'  },
    ]

    const { logout } = useAuth()

    const [searchQuery, setSearchQuery] = useState('')

    const search = async () => {
        router.push({
            pathname: '/search',
            query: {
                searchQuery: searchQuery
            }
        })
    }

    return (
        <>
            <Popover
                as="header"
                className={({ open }) =>
                    classNames(
                        open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
                        'bg-gradient-to-b from-yellow-50 to-gray-50 lg:overflow-y-visible',
                    )
                }>
                {({ open }) => (
                    <>
                        <div className="py-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                                <div className="flex lg:static xl:col-span-3">
                                    <div className="flex flex-shrink-0 items-center">
                                        <Link href="/dashboard">
                                            <ApplicationLogo />
                                        </Link>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                                    <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                                        <div className="w-full">
                                            <label
                                                htmlFor="search"
                                                className="sr-only">
                                                Search
                                            </label>
                                            <div className="relative">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <MagnifyingGlassIcon
                                                        className="h-5 w-5 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <input
                                                    id="search"
                                                    name="search"
                                                    className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                    placeholder="Search"
                                                    type="search"
                                                    onChange={event =>
                                                        setSearchQuery(event.target.value)
                                                    }
                                                    onKeyDown={event => {
                                                        if (event.key === 'Enter') {
                                                            event.preventDefault()
                                                            search()
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                                    <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600">
                                        <span className="sr-only">
                                            Open menu
                                        </span>
                                        {open ? (
                                            <XMarkIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Popover.Button>
                                </div>
                                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-3">
                                    <Menu
                                        as="div"
                                        className="relative ml-5 flex-shrink-0">
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                                                <span className="sr-only">
                                                    Open user menu
                                                </span>
                                                <span
                                                    className="h-8 w-8 text-xl rounded-full uppercase bg-blue-900 text-gray-50 flex justify-center items-center"
                                                    alt="">
                                                    {user?.name.charAt(0)}
                                                </span>
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95">
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item key="Sign Out">
                                                    {({ active }) => (
                                                        <span
                                                            onClick={logout}
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100'
                                                                    : '',
                                                                'block cursor-pointer px-4 py-2 text-sm text-gray-700',
                                                            )}>
                                                            Sign Out
                                                        </span>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>

                                    <LinkButton href="/create-record" className="ml-6 inline-flex items-center">
                                        <PlusIcon
                                            className="mr-1 h-4 w-4 text-blue-50"
                                            aria-hidden="true"
                                        />
                                        New Record
                                    </LinkButton>
                                </div>
                            </div>
                        </div>

                        <Popover.Panel
                            as="nav"
                            className="lg:hidden"
                            aria-label="Global">
                            <div className="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4">
                                {navigation.map(item => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        aria-current={
                                            item.current ? 'page' : undefined
                                        }
                                        className={classNames(
                                            item.current
                                                ? 'bg-yellow-100 text-yellow-900'
                                                : 'hover:bg-yellow-100 text-yellow-800 hover:text-yellow-900',
                                            'block rounded-md py-2 px-3 text-base font-medium',
                                        )}>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="border-t border-gray-200 pb-3 pt-4">
                                <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                                    <div className="flex-shrink-0">
                                        <span
                                            className="h-10 w-10 text-2xl rounded-full uppercase bg-blue-900 text-gray-50 flex justify-center items-center"
                                            alt="">
                                            {user?.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-semibold text-yellow-700">
                                            {user?.name}
                                        </div>
                                        <div className="text-sm font-medium text-yellow-600">
                                            {user?.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                                    <span
                                        onClick={logout}
                                        className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-yellow-800 hover:bg-yellow-100 hover:text-yellow-900">
                                        Sign Out
                                    </span>
                                </div>
                            </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>
        </>
    )
}

export default Navigation
