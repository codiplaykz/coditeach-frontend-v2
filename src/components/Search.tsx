import Icon from "../helpers/Icon";
import {useState} from "react";

interface SearchProps {
    array: string[]
    setArray: Function
}

export default function Search({array, setArray}: SearchProps) {
    const [inputValue, setInputValue] = useState('')

    const handleInputValueChange = (value: string) => {
        if (value) {
            setInputValue(value)
            array.filter((item) => {

            })
        }
    }



    return (
        <div className="search-container">
            <Icon color={"#C2C2C2"} size={1} name={'Search'}/>
            <input
                value={inputValue} onChange={(e)=>{handleInputValueChange(e.target.value)}}
                className="search-input" placeholder={"Поиск"}/>
        </div>
    )
}