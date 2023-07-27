import AppLayout from '@/components/Layouts/AppLayout'
import Link from 'next/link'
import Head from 'next/head'
import RecordCard from '@/components/RecordCard'
import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
} from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react'
import { useRecord } from '@/hooks/record'
import { useRouter } from 'next/router'

const Search = () => {
    const router = useRouter()

    const { globalSearch, globalSearchWithUrl } = useRecord()

    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState('')
    const [lastPage, setLastPage] = useState('')
    const [prevPageUrl, setPrevPageUrl] = useState('')
    const [nextPageUrl, setNextPageUrl] = useState('')
    const [perPage, setPerPage] = useState('')
    const [total, setTotal] = useState('')
    const [records, setRecords] = useState([])

    useEffect(() => {
        if (!router.query.searchQuery) {
            return
        }

        const search = async () => {
            const { records } = await globalSearch(router.query.searchQuery)

            setSearchQuery(router.query.searchQuery)

            setCurrentPage(records.current_page)
            setLastPage(records.last_page)
            setPrevPageUrl(records.prev_page_url)
            setNextPageUrl(records.next_page_url)
            setPerPage(records.per_page)
            setTotal(records.total)
            setRecords(records.data)
        }

        search()
    }, [router.query.searchQuery])

    const search = async url => {
        if (!url) {
            return
        }

        const { records } = await globalSearchWithUrl(url)

        setCurrentPage(records.current_page)
        setLastPage(records.last_page)
        setPrevPageUrl(records.prev_page_url)
        setNextPageUrl(records.next_page_url)
        setPerPage(records.per_page)
        setTotal(records.total)
        setRecords(records.data)
    }

    return (
        <AppLayout>
            <Head>
                <title>TCMDb | {searchQuery}</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-3xl font-semibold text-gray-900">
                        {total} results for {searchQuery}
                    </h2>
                    <ul
                        role="list"
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {records?.map(record => (
                            <Link
                                key={record.imdbId}
                                href={`/record/${record.imdbId}`}>
                                <RecordCard record={record} />
                            </Link>
                        ))}
                    </ul>
                    {records.length < 1 && (
                        <span className="text-gray-600">
                            Nothing to be found
                        </span>
                    )}
                    {total > perPage && (
                        <nav className="flex items-center justify-between px-4 sm:px-0 mt-4">
                            <div className="-mt-px flex w-0 flex-1">
                                <button
                                    type="button"
                                    disabled={!prevPageUrl}
                                    onClick={() => search(prevPageUrl)}
                                    className="inline-flex items-center pr-1 pt-4 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:hover:text-gray-300">
                                    <ArrowLongLeftIcon
                                        className={`mr-3 h-5 w-5 text-gray-400 ${
                                            !prevPageUrl && 'text-gray-300'
                                        }`}
                                        aria-hidden="true"
                                    />
                                    Previous
                                </button>
                            </div>
                            <div className="hidden md:-mt-px md:flex text-sm font-medium text-gray-700">
                                Page {currentPage}/{lastPage}
                            </div>
                            <div className="-mt-px flex w-0 flex-1 justify-end">
                                <button
                                    type="button"
                                    disabled={!nextPageUrl}
                                    onClick={() => search(nextPageUrl)}
                                    className="inline-flex items-center pl-1 pt-4 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:hover:text-gray-300">
                                    Next
                                    <ArrowLongRightIcon
                                        className={`ml-3 h-5 w-5 text-gray-400 ${
                                            !nextPageUrl && 'text-gray-300'
                                        }`}
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </nav>
                    )}
                </div>
            </div>
        </AppLayout>
    )
}

export default Search
