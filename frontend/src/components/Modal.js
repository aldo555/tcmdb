import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Button from '@/components/Button'
import SecondaryButton from '@/components/SecondaryButton'
import { Inter } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

const Modal = ({
    isOpen,
    onClose,
    title,
    confirm = 'Confirm',
    cancel = 'Cancel',
    isWarning = false,
    action,
    children,
}) => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className={`relative z-10 ${inter.variable} font-sans`}
                onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div>
                                    <div
                                        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                                            !isWarning
                                                ? 'bg-blue-100'
                                                : 'bg-red-100'
                                        }`}>
                                        {!isWarning ? (
                                            <CheckIcon
                                                className="h-6 w-6 text-blue-600"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <ExclamationTriangleIcon
                                                className="h-6 w-6 text-red-600"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900">
                                            {title}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-600">
                                                {children}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                    <Button
                                        type="button"
                                        className={`inline-flex w-full justify-center sm:col-start-2 ${
                                            isWarning &&
                                            'bg-red-700 hover:bg-red-800 active:bg-red-800 focus:border-red-900 ring-red-300'
                                        }`}
                                        onClick={() => {
                                            onClose()
                                            action()
                                        }}>
                                        {confirm}
                                    </Button>
                                    <SecondaryButton
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center sm:col-start-1 sm:mt-0"
                                        onClick={onClose}>
                                        {cancel}
                                    </SecondaryButton>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
