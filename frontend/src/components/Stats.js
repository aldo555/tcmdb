const Stats = ({ className, stats }) => {
    return (
        <div className={`${className} rounded-md`}>
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 rounded-md">
                    {stats.map(stat => (
                        <div
                            key={stat.name}
                            className="bg-slate-100 px-4 py-6 sm:px-6 lg:px-8 rounded-md border border-slate-900 border-opacity-5">
                            <p className="text-sm font-medium leading-6 text-slate-400">
                                {stat.name}
                            </p>
                            <p className="mt-2 flex items-baseline gap-x-2">
                                <span className="text-4xl font-semibold tracking-tight text-slate-900">
                                    {stat.value}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Stats
