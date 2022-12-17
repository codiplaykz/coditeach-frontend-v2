import { Disclosure, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import '../styles/helpers/customDisclosure.scss'

interface CustomDisclosureProps {
    button: any,
    content: any
    props?: any
}

export default function CustomDisclosure({button, content, ...props}: CustomDisclosureProps) {
    return (
        <Disclosure {...props} defaultOpen={true}>
            <Disclosure.Button className="d-button">
                {button}
            </Disclosure.Button>

            <Transition
                enter="enter"
                enterFrom="enterFrom"
                enterTo="enterTo"
                leave="leave"
                leaveFrom="leaveFrom"
                leaveTo="leaveTo"
            >
                <Disclosure.Panel>
                    {content}
                </Disclosure.Panel>
            </Transition>
        </Disclosure>
    )
}