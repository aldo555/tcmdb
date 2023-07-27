const Badge = ({ className, children }) => (
    <span className={`${className} inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-700/10`}>
        {children}
    </span>
)

export default Badge
