import AppLayout from '@/components/Layouts/AppLayout'
import Badge from '@/components/Badge'
import Head from 'next/head'
import { toast } from 'react-hot-toast'
import { useRecord } from '@/hooks/record'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { StarIcon, TrophyIcon, ArrowPathIcon, TrashIcon } from '@heroicons/react/20/solid'
import Button from '@/components/Button'
import useDialog from '@/hooks/dialog'
import Modal from '@/components/Modal'
import ApplicationLogo from '@/components/ApplicationLogo'


const Record = () => {
    const router = useRouter()

    const { dialogOpen, handleOpenDialog, handleCloseDialog } = useDialog()

    const { getRecord, updateRecord, deleteRecord } = useRecord()

    const [record, setRecord] = useState('')
    const [genres, setGenres] = useState('')

    useEffect(() => {
        if (!router.query.imdbId) {
            return
        }

        const fetchRecord = async () => {
            const { record, message } = await getRecord(router.query.imdbId)

            if (message) {
                toast.error(message)
                router.push('/dashboard')
                return
            }

            setRecord(record)

            const genresArray = record.genre.trim().split(',')
            setGenres(genresArray.map(item => item.trim()))
        }

        fetchRecord()
    }, [router.query.imdbId])

    const updateRecordRequest = async () => {
        const { message, error, updatedRecord } = await updateRecord({
            id: record.id,
        })

        if (error) {
            toast.error(message)
            return
        }

        setRecord(updatedRecord)
        toast.success(message)
    }

    const deleteRecordRequest = async () => {
        const { message, error } = await deleteRecord({
            id: record.id,
        })

        if (error) {
            toast.error(message)
            return
        }

        toast.success(message)
        router.push('/dashboard')
    }

    const getInitials = (name) => {
        if (!name) return ''

        const words = name.split(' ')
        const initials = words
            .filter(word => word)
            .map(word => word.charAt(0).toUpperCase())
            .join('')

        return initials
    }

    return (
        <AppLayout>
            <Head>
                <title>TCMDb {record?.title && `| ${record.title}`}</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-50">
                        <div className="pb-16 sm:pb-24">
                            <div className="">
                                <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
                                    <div className="lg:col-span-5 lg:col-start-8">
                                        <div className="flex justify-between">
                                            <div>
                                                <h1 className="text-2xl font-medium text-gray-900">
                                                    {record.title}
                                                </h1>
                                                <div className="mt-2">
                                                    <div className="flex items-center text-gray-700">
                                                        {record.releasedYear} ·{' '}
                                                        {record.type ==
                                                            'series' &&
                                                            record.totalSeasons !==
                                                                'N/A' &&
                                                            `${record.totalSeasons} seasons · `}
                                                        {record.rated} ·{' '}
                                                        {record.runtime}
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    {genres &&
                                                        genres.map(genre => (
                                                            <Badge
                                                                className="mr-1"
                                                                key={genre}>
                                                                {genre}
                                                            </Badge>
                                                        ))}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="text-lg font-medium text-gray-900 pl-8">
                                                    {record.imdbRating && (
                                                        <div className="flex justify-center items-center text-xl">
                                                            <StarIcon
                                                                className="h-6 w-6 text-yellow-400 mr-1"
                                                                aria-hidden="true"
                                                            />
                                                            <span className="block text-gray-700">
                                                                {
                                                                    record.imdbRating
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-gray-600 text-sm">
                                                    {record.imdbVotes}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0 flex items-center justify-center">
                                        {record.poster && record.poster !== 'N/A' && <img
                                            src={record.poster}
                                            alt={`Poster of ${record.title}`}
                                            className="rounded-lg drop-shadow-2xl"
                                        />}
                                        {(!record.poster || record.poster === 'N/A') &&
                                            <div className="w-72 h-96 rounded-lg bg-slate-900 flex items-center justify-center drop-shadow-2xl">
                                                <ApplicationLogo />
                                            </div>
                                        }
                                    </div>

                                    <div className="mt-8 lg:col-span-5">
                                        <div className="pointer-events-auto flex items-center gap-x-3 bg-yellow-100 border-2 border-opacity-25 border-amber-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
                                            <TrophyIcon
                                                className="h-4 w-4 text-yellow-700"
                                                aria-hidden="true"
                                            />
                                            <p className="text-sm leading-6 text-yellow-700">
                                                <strong className="font-semibold">
                                                    Awards
                                                </strong>
                                                <svg
                                                    viewBox="0 0 2 2"
                                                    className="mx-2 inline h-0.5 w-0.5 fill-current"
                                                    aria-hidden="true">
                                                    <circle
                                                        cx={1}
                                                        cy={1}
                                                        r={1}
                                                    />
                                                </svg>
                                                {record.awards}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-5">
                                        <div className="mt-10">
                                            <h2 className="text-sm font-medium text-gray-900">
                                                Plot
                                            </h2>

                                            <div
                                                className="prose prose-sm mt-4 text-gray-500"
                                                dangerouslySetInnerHTML={{
                                                    __html: record.plot,
                                                }}
                                            />
                                        </div>

                                        {record && record.actors.length > 0 && (
                                            <div className="mt-8 border-t border-gray-200 pt-8">
                                                <ul
                                                    role="list"
                                                    className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-2">
                                                    {record.actors.map(actor => (
                                                        <li
                                                            key={actor.name}
                                                            className="col-span-1 flex rounded-md shadow-sm">
                                                            <div className="bg-blue-800 flex w-16 h-12 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white">
                                                                {getInitials(actor.name)}
                                                            </div>
                                                            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                                                                <div className="flex-1 truncate px-4 py-2 text-sm">
                                                                    <span className="font-medium text-gray-900">
                                                                        {actor.name}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="mt-8 border-t border-gray-200 pt-8">
                                            <dl className="divide-y divide-gray-100">
                                                <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                                    <dt className="text-sm font-medium text-gray-900">
                                                        Writer
                                                    </dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                        {record.writer}
                                                    </dd>
                                                </div>
                                                <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                                    <dt className="text-sm font-medium text-gray-900">
                                                        Director
                                                    </dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                        {record.director}
                                                    </dd>
                                                </div>
                                                <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                                    <dt className="text-sm font-medium text-gray-900">
                                                        Language
                                                    </dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                        {record.language}
                                                    </dd>
                                                </div>
                                                <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                                    <dt className="text-sm font-medium text-gray-900">
                                                        Country
                                                    </dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                        {record.country}
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>

                                        {record && record.ratings.length > 0 && (
                                            <div className="mt-8 border-t border-gray-200 pt-8">
                                                <dl className="divide-y divide-gray-100">
                                                    {record.ratings.map(rating => (
                                                        <div key={rating.source} className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                                                            <dt className="text-sm font-medium sm:col-span-2 text-gray-900">
                                                                {rating.source}
                                                            </dt>
                                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
                                                                {rating.value}
                                                            </dd>
                                                        </div>
                                                    ))}
                                                </dl>
                                            </div>
                                        )}

                                        <div className="flex justify-between space-x-2 pt-8 mt-8 border-t border-gray-200">
                                            <Button onClick={updateRecordRequest} className="w-full text-center">
                                                <ArrowPathIcon
                                                    className="mr-1 h-4 w-4 text-blue-50"
                                                    aria-hidden="true"
                                                />
                                                Update Record
                                            </Button>
                                            <Button onClick={handleOpenDialog} className="w-full text-center bg-red-700 hover:bg-red-800 active:bg-red-800 focus:border-red-900 ring-red-300">
                                                <TrashIcon
                                                    className="mr-1 h-4 w-4 text-red-50"
                                                    aria-hidden="true"
                                                />
                                                Delete Record
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={dialogOpen}
                onClose={handleCloseDialog}
                title={`Delete Record`}
                action={deleteRecordRequest}
                isWarning={true}>
                Are you sure you want to delete{' '}
                <span className="font-semibold">
                    {record.title}?
                </span>
            </Modal>
        </AppLayout>
    )
}

export default Record
