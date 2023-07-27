import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import Toastwind from '../Toastwind'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <div className="min-h-screen bg-gray-50">
            <Toastwind />

            <Navigation user={user} />

            {/* Page Content */}
            <main>{children}</main>
        </div>
    )
}

export default AppLayout
