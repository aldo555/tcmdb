import { toast } from 'react-hot-toast'
import AppLayout from '@/components/Layouts/AppLayout'
import Link from 'next/link'
import Head from 'next/head'
import { useRecord } from '@/hooks/record'
import RecordCard from '@/components/RecordCard'
import { useState, useEffect } from 'react'
import Stats from '@/components/Stats'

const Dashboard = () => {
    const [movies, setMovies] = useState([])
    const [series, setSeries] = useState([])
    const [stats, setStats] = useState([])

    const { getDashboardData } = useRecord()

    useEffect(() => {
        const fetchDashboardData = async () => {
            const { movies, series, stats, message } = await getDashboardData()

            if (message) {
                toast.error(message)
                return
            }

            setMovies(movies)
            setSeries(series)
            setStats(stats)
        }

        fetchDashboardData()
    }, [])

    return (
        <AppLayout>
            <Head>
                <title>TCMDb</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-3xl font-semibold text-gray-900">
                        Latest Movies
                    </h2>
                    <ul
                        role="list"
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {movies?.map(record => (
                            <Link
                                key={record.imdbId}
                                href={`/record/${record.imdbId}`}>
                                <RecordCard record={record} />
                            </Link>
                        ))}
                    </ul>
                    {movies.length < 1 && (
                        <span className="text-gray-600">Nothing here yet</span>
                    )}

                    <h2 className="mt-12 mb-4 text-3xl font-semibold text-gray-900">
                        Latest Series
                    </h2>
                    <ul
                        role="list"
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {series?.map(record => (
                            <Link
                                key={record.imdbId}
                                href={`/record/${record.imdbId}`}>
                                <RecordCard record={record} />
                            </Link>
                        ))}
                    </ul>
                    {series.length < 1 && (
                        <span className="text-gray-600">Nothing here yet</span>
                    )}

                    <div className="w-full h-px border-t border-gray-900 border-opacity-10 my-12" />

                    <Stats stats={stats} />
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
