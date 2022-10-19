import { useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import '../styles/listbox.scss'
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/24/outline";

interface DropdownProps {
    list: Array<any>,
    onChange: Function
}

export default function Dropdown({list, onChange}: DropdownProps) {
    const [selectedItem, setSelectedItem] = useState(list[0])

    return (
        <div className="dropdown">
            <Listbox value={selectedItem} onChange={(item)=>{setSelectedItem(item); onChange(item)}}>
                <div className="dropdown-inner">
                    <Listbox.Button className={"dropdown-button"}>
                    <span className="text">
                        {selectedItem}
                    </span>
                        <span className="icon">
                        <ChevronUpDownIcon
                            aria-hidden="true"
                        />
                    </span>
                    </Listbox.Button>

                    <Transition
                        enter="enter"
                        enterFrom="enterFrom"
                        enterTo="enterTo"
                        leave="leave"
                        leaveFrom="leaveFrom"
                        leaveTo="leaveTo"
                    >

                        <Listbox.Options className={"options-container"}>
                            {list.map((item, index) =>
                                // @ts-ignore
                                <Listbox.Option className={({active}) => `option ${active ? 'option-active' : ''}`} key={`dropdown-${index}`} value={item}>
                                    {({ selected }) => (
                                        <>
                                          <span
                                              className={`option-inner ${ selected ? 'option-inner-active' : ''}`}>
                                            {item}
                                          </span>
                                            {selected ? (
                                                <>
                                                    <span className="icon">
                                                      <CheckIcon aria-hidden="true" />
                                                    </span>
                                                </>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            )}
                        </Listbox.Options>

                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}