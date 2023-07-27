import { toast } from 'react-hot-toast'
import Head from 'next/head'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import {
    ArrowLongLeftIcon,
    ArrowLongRightIcon,
} from '@heroicons/react/20/solid'
import { useRef, useState, useEffect } from 'react'
import { useRecord } from '@/hooks/record'
import AppLayout from '@/components/Layouts/AppLayout'
import RecordCard from '@/components/RecordCard'
import useDialog from '@/hooks/dialog'
import Modal from '@/components/Modal'

const CreateRecord = () => {
    const { dialogOpen, handleOpenDialog, handleCloseDialog } = useDialog()

    const { createRecord, searchRecordInOmdb } = useRecord()

    const titleRef = useRef(null)

    const isMounted = useRef(false)

    const [imdbId, setImdbId] = useState('')
    const [title, setTitle] = useState('')
    const [lastSearchedTitle, setLastSearchedTitle] = useState('')
    const [page, setPage] = useState(1)
    const [selectedRecord, setSelectedRecord] = useState('')
    const [results, setResults] = useState([])
    const [totalResults, setTotalResults] = useState('')
    const [errors, setErrors] = useState([])

    const searchTitle = async () => {
        setImdbId('')
        setResults([])
        setTotalResults('')

        if (title != lastSearchedTitle) {
            setPage(1)
            setLastSearchedTitle(title)
        }

        const loading = toast.loading('Loading...')
        const { results, totalResults, message } = await searchRecordInOmdb({
            setErrors,
            page,
            title,
        })

        toast.dismiss(loading)

        if (!results) {
            toast.error(message)
            return
        }

        setResults(results)
        setTotalResults(totalResults)

        if (page > 1) {
            return
        }

        toast.success(message)
    }

    const previousSearchPage = () => {
        if (page === 1) {
            return
        }

        setPage(page - 1)
    }

    const nextSearchPage = () => {
        if (page * 10 > totalResults) {
            return
        }

        setPage(page + 1)
    }

    useEffect(() => {
        if (isMounted.current) {
            searchTitle()
        } else {
            isMounted.current = true
        }
    }, [page])

    const selectRecord = record => {
        handleOpenDialog()

        setSelectedRecord(record)
    }

    const addSelectedRecord = () => {
        createRecordRequest()
    }

    const submitForm = async event => {
        event.preventDefault()

        if (document.activeElement === titleRef.current) {
            searchTitle()
            return
        }

        createRecordRequest()
    }

    const createRecordRequest = async () => {
        const { message, error } = await createRecord({
            setErrors,
            imdbId: selectedRecord ? selectedRecord.imdbId : imdbId,
        })

        if (error) {
            toast.error(message)
            return
        }

        setImdbId('')
        toast.success(message)
    }

    return (
        <AppLayout>
            <Head>
                <title>TCMDb | New Record</title>
            </Head>

            <form
                onSubmit={submitForm}
                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-12">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                By using IMDb ID
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Create a new record by providing its respective
                                IMDb ID. <br />
                                All other data will be automatically filled in.
                            </p>
                        </div>

                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                            <div className="sm:col-span-4">
                                <Label htmlFor="imdb-id">IMDb ID</Label>

                                <Input
                                    id="imdb-id"
                                    type="text"
                                    value={imdbId}
                                    className="block mt-2 w-full"
                                    onChange={event =>
                                        setImdbId(event.target.value)
                                    }
                                />

                                <InputError
                                    messages={errors?.imdbId}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                By using the title
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Create a new record only by searching for its
                                title. <br />
                                After entering a title and hitting the search
                                button below the input you will be able to pick
                                the wanted record from a list of results. <br />
                                All other data will be automatically filled in.
                            </p>
                        </div>

                        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                            <div className="sm:col-span-4">
                                <Label htmlFor="title">Title</Label>

                                <Input
                                    id="title"
                                    type="text"
                                    ref={titleRef}
                                    value={title}
                                    className="block mt-2 w-full"
                                    onChange={event =>
                                        setTitle(event.target.value)
                                    }
                                />

                                <InputError
                                    messages={errors?.title}
                                    className="mt-2"
                                />

                                <div className="flex justify-end mt-4">
                                    <Button
                                        onClick={searchTitle}
                                        type="button"
                                        className="ml-3">
                                        Search
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-3">
                            <ul
                                role="list"
                                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {results?.map(record => (
                                    <RecordCard
                                        key={record.imdbId}
                                        onClick={() => selectRecord(record)}
                                        record={record}
                                    />
                                ))}
                            </ul>
                            {results.length > 0 && (
                                <nav className="flex items-center justify-between px-4 sm:px-0 mt-4">
                                    <div className="-mt-px flex w-0 flex-1">
                                        <button
                                            type="button"
                                            disabled={page === 1}
                                            onClick={previousSearchPage}
                                            className="inline-flex items-center pr-1 pt-4 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:hover:text-gray-300">
                                            <ArrowLongLeftIcon
                                                className={`mr-3 h-5 w-5 text-gray-400 ${
                                                    page === 1 &&
                                                    'text-gray-300'
                                                }`}
                                                aria-hidden="true"
                                            />
                                            Previous
                                        </button>
                                    </div>
                                    <div className="hidden md:-mt-px md:flex text-sm font-medium text-gray-700">
                                        Page {page}/
                                        {Math.ceil(totalResults / 10)}
                                    </div>
                                    <div className="-mt-px flex w-0 flex-1 justify-end">
                                        <button
                                            type="button"
                                            disabled={
                                                page ==
                                                Math.ceil(totalResults / 10)
                                            }
                                            onClick={nextSearchPage}
                                            className="inline-flex items-center pl-1 pt-4 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:hover:text-gray-300">
                                            Next
                                            <ArrowLongRightIcon
                                                className={`ml-3 h-5 w-5 text-gray-400 ${
                                                    page ==
                                                        Math.ceil(
                                                            totalResults / 10,
                                                        ) && 'text-gray-300'
                                                }`}
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </nav>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <Button className="ml-3">Save Record</Button>
                </div>
            </form>
            {selectedRecord && (
                <Modal
                    isOpen={dialogOpen}
                    onClose={handleCloseDialog}
                    title={`Create Record`}
                    action={addSelectedRecord}>
                    Are you sure you want to add{' '}
                    <span className="font-semibold">
                        {selectedRecord.title}?
                    </span>
                </Modal>
            )}
        </AppLayout>
    )
}

export default CreateRecord
