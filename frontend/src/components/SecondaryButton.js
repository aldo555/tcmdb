const SecondaryButton = ({ type = 'submit', className, ...props }) => (
    <button
        type={type}
        className={`${className} inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-900 uppercase tracking-widest hover:bg-gray-300 active:bg-gray-300 focus:outline-none focus:border-gray-400 focus:ring ring-gray-400 disabled:opacity-25 transition ease-in-out duration-150`}
        {...props}
    />
)

export default SecondaryButton
