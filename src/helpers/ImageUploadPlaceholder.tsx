import '../styles/helpers/imageUploadPlaceholder.scss'
import Icon from "./Icon";
import {useState} from "react";

export default function ImageUploadPlaceholder() {
    const [drag, setDrag] = useState(false)


    function dragStartHandler(e: any) {
        e.preventDefault()
        setDrag(true)
    }

    function dragLeaveHandler(e: any) {
        e.preventDefault()
        setDrag(false)
    }

    // @ts-ignore
    function onDropHandler(e) {
        // @ts-ignore
        let files = [...e.dataTransfer.files]
        console.log(files)
        const formData = new FormData()
        formData.append('file', files[0])
    }

    return (
        <div className="image-upload-placeholder-container"
             onDragStart={e => dragStartHandler(e)}
             onDragLeave={e => dragLeaveHandler(e)}
             onDragOver={e => dragStartHandler(e)}
             onDrag={e => {e.preventDefault(); onDropHandler(e)}}
        >
            <div className={`container-inner`}>
                <Icon color={"#C2C2C2"} size={2} name={"Image"}/>
                <p className="title">{drag ? 'Отпустите' : 'Перетащите'} изображение сюда или <a href="">Выберите</a></p>
                <p className="subtitle">Рекомендуется: 1600x900 или больше</p>
            </div>
        </div>
    )
}