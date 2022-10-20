import {Dialog, Transition} from '@headlessui/react'
import {Fragment, ReactElement, useRef} from 'react'
import '../styles/helpers/modal.scss'

interface ModalProps {
    open: boolean,
    setOpen: Function
    children: ReactElement
}

export default function Modal({open, setOpen, children}: ModalProps) {
    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="s14" initialFocus={cancelButtonRef} onClose={()=>{setOpen(false)}}>
                <Transition.Child
                    as={Fragment}
                    enter="s2"
                    enterFrom="s3"
                    enterTo="s4"
                    leave="s5"
                    leaveFrom="s4"
                    leaveTo="s3"
                >
                    <div className="s15" />
                </Transition.Child>

                <div className="s6">
                    <div className="s7">
                        <Transition.Child
                            as={Fragment}
                            enter="s2"
                            enterFrom="s8"
                            enterTo="s9"
                            leave="s10"
                            leaveFrom="s11"
                            leaveTo="s12"
                        >
                            <Dialog.Panel className="s13">
                                <div className="s16">
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}