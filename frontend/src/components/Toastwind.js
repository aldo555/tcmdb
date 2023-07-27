import { Toaster, ToastIcon, resolveValue } from 'react-hot-toast'
import { Transition } from '@headlessui/react'

const Toastwind = () => (
    <Toaster position="bottom-center" reverseOrder={false}>
        {t => (
            <Transition
                appear
                show={t.visible}
                className="transform px-4 py-3 flex bg-white rounded-md drop-shadow-xl"
                enter="transition-all duration-150"
                enterFrom="opacity-0 scale-50"
                enterTo="opacity-100 scale-100"
                leave="transition-all duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-75">
                <ToastIcon toast={t} />
                <p className="px-2">{resolveValue(t.message)}</p>
            </Transition>
        )}
    </Toaster>
)

export default Toastwind
