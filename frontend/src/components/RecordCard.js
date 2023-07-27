import { StarIcon } from '@heroicons/react/20/solid'
import ApplicationLogo from './ApplicationLogo'

const RecordCard = ({ record, ...props }) => (
    <li {...props} className="rounded-md bg-white text-center drop-shadow-md">
        <div
            className="group flex flex-col justify-center items-center bg-slate-900 relative h-[26rem] p-8 bg-cover bg-center rounded-md transition-all ease-in-out duration-300 cursor-pointer overflow-hidden"
            style={
                record.poster !== 'N/A'
                    ? { backgroundImage: `url(${record.poster})` }
                    : {}
            }>
            {record.poster === 'N/A' && (
                <>
                    <ApplicationLogo />
                </>
            )}
            <div className="absolute bottom-0 left-0 w-full mix-blend-multiply h-16 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-700 rounded-b-md transition-all ease-in-out duration-300 group-hover:opacity-50 group-hover:h-full group-hover:backdrop-blur-sm group-hover:rounded-md" />
            <div className="absolute bottom-0 left-0 p-2 pt-1 group-hover:p-4 flex flex-col justify-between w-full h-16 rounded-b-md transition-all ease-in-out duration-300 group-hover:h-full group-hover:backdrop-blur-sm group-hover:rounded-md">
                <div>
                    <span className="font-semibold text-center text-lg text-white line-clamp-1 group-hover:line-clamp-none">
                        {record.title}
                    </span>
                    <span className="font-medium text-slate-100 text-sm capitalize">
                        {record.releasedYear} &middot; {record.type}
                    </span>
                    {record.plot && record.plot !== 'N/A' && (
                        <div className="hidden group-hover:block">
                            <span className="line-clamp-6 text-slate-50 mt-5 text-left max-w-prose">
                                {record.plot}
                            </span>
                        </div>
                    )}
                </div>
                <div className="hidden group-hover:block">
                    <span className="font-medium text-sm text-slate-100">
                        {record.genre}
                    </span>
                    <div className="mt-1 grid grid-cols-3 gap-4">
                        <span className="font-semibold text-slate-100">
                            {record.rated}
                        </span>
                        <span className="font-semibold text-slate-100">
                            {record.runtime}
                        </span>
                        {record.imdbRating && (
                            <div className="flex justify-center items-center font-semibold text-slate-100">
                                <StarIcon
                                    className="h-4 w-4 text-yellow-400 mr-1"
                                    aria-hidden="true"
                                />
                                <span>{record.imdbRating}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </li>
)

export default RecordCard
