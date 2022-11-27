import {Popover, Transition} from '@headlessui/react'
import {Fragment} from 'react'
import '../styles/helpers/popover.scss'

interface CustomPopoverProps {
    button: any
    children: any
}

export default function CustomPopover({children, button}: CustomPopoverProps) {
    return (
        <Popover className="popover-container">
            <Popover.Button className="popover-button">
                {button}
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="enter"
                enterFrom="enterFrom"
                enterTo="enterTo"
                leave="leave"
                leaveFrom="leaveFrom"
                leaveTo="leaveTo"
            >
                <Popover.Panel className="inner-container">
                    {children}
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}