const AuthCard = ({ logo, children }) => (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-0 sm:pt-0 bg-gray-100">
        <div>{logo}</div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
            {children}
        </div>
    </div>
)

export default AuthCard
