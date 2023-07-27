import Link from 'next/link'

const ApplicationLogo = ({ className }) => (
    <span
        className={`${className} text-3xl bg-yellow-400 text-black font-extrabold tracking-tighter px-2.5 py-1.5 rounded-md border-2 border-black border-opacity-5 drop-shadow-lg`}>
        TCMDb
    </span>
)

export default ApplicationLogo
