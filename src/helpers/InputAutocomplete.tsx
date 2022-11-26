import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import '../styles/helpers/InputAutocomplete.scss'

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
]

interface InputAutocomplete {
    array: any[],
    selected: any,
    setSelected: Function
}

export default function InputAutocomplete({array, selected, setSelected}: InputAutocomplete) {
    const [query, setQuery] = useState('')

    const filtered =
        query === ''
            ? array
            : array.filter((item) =>
                item.toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    return (
        // @ts-ignore
        <Combobox value={selected} onChange={setSelected}>
            <div className="combobox-container">
                <div className="inner-container">
                    <Combobox.Input
                        className="input"
                        placeholder="Введите название города или населенного пункта"
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="button">
                        <ChevronUpDownIcon
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="leave"
                    leaveFrom="leave-from"
                    leaveTo="leave-to"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="options">
                        {filtered.length === 0 && query !== '' ? (
                            <div className="not-found">
                                Ничего не найдено.
                            </div>
                        ) : (
                            filtered.map((item, index) => (
                                <Combobox.Option
                                    key={index+"-combobox-item-"+item}
                                    className={({ active }) => `option ${active && 'option-active'}`}
                                    value={item}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`text ${ selected && 'text-selected' }`}
                                            >
                                              {item}
                                            </span>
                                            {selected ? (
                                            <span
                                                className={`icon ${ active && 'icon-active'}`}
                                            >
                                                <CheckIcon aria-hidden="true" />
                                            </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
}
