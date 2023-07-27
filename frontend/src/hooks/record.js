import axios from '@/lib/axios'

export const useRecord = () => {
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const getDashboardData = async () => {
        try {
            const { data } = await axios.get(`/api/records`)

            return data
        } catch (error) {
            return {
                message: error.response.data.message,
            }
        }
    }

    const globalSearch = async search => {
        try {
            const { data } = await axios.get(
                `/api/records/global-search/${search}`,
            )

            return data
        } catch (error) {
            return {
                message: error.response.data.message,
            }
        }
    }

    const globalSearchWithUrl = async url => {
        try {
            const { data } = await axios.get(url)

            return data
        } catch (error) {
            return {
                message: error.response.data.message,
            }
        }
    }

    const getRecord = async imdbId => {
        try {
            const { data } = await axios.get(`/api/records/${imdbId}`)

            return data
        } catch (error) {
            return {
                message: error.response.data.message,
            }
        }
    }

    const searchRecordInOmdb = async ({ setErrors, page, title }) => {
        setErrors([])

        try {
            const { data } = await axios.get(
                `/api/records/search?title=${title}&page=${page}`,
            )

            return {
                message: data.message,
                results: data.results,
                totalResults: data.totalResults,
            }
        } catch (error) {
            setErrors(error.response.data.errors)

            return {
                message: error.response.data.message,
            }
        }
    }

    const createRecord = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        try {
            const { data } = await axios.post('/api/records', props)

            return {
                message: data.message,
            }
        } catch (error) {
            setErrors(error.response.data.errors)

            return {
                message: error.response.data.message,
                error: true,
            }
        }
    }

    const updateRecord = async ({ id }) => {
        await csrf()

        try {
            const { data } = await axios.put(`/api/records/${id}`)

            return {
                message: data.message,
                updatedRecord: data.record,
            }
        } catch (error) {
            return {
                message: error.response.data.message,
                error: true,
            }
        }
    }

    const deleteRecord = async ({ id }) => {
        await csrf()

        try {
            const { data } = await axios.delete(`/api/records/${id}`)

            return {
                message: data.message,
            }
        } catch (error) {
            return {
                message: error.response.data.message,
                error: true,
            }
        }
    }

    return {
        getDashboardData,
        globalSearch,
        globalSearchWithUrl,
        getRecord,
        searchRecordInOmdb,
        createRecord,
        updateRecord,
        deleteRecord,
    }
}
