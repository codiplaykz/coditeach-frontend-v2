import '../styles/helpers/imageUploadPlaceholder.scss'
import Icon from "./Icon";
import {useState} from "react";
import {XMarkIcon} from "@heroicons/react/24/outline";

interface ImageUploadPlaceholderProps {
    uploadedImage: File,
    setUploadedImage: Function
}

export default function ImageUploadPlaceholder({uploadedImage, setUploadedImage}: ImageUploadPlaceholderProps) {
    const [drag, setDrag] = useState(false)

    const dragStartHandler = (e: any) => {
        e.preventDefault()
        setDrag(true)
    }

    const dragLeaveHandler = (e: any) => {
        e.preventDefault()
        setDrag(false)
    }

    // @ts-ignore
    const onDropHandler = (e) => {
        // @ts-ignore
        e.preventDefault()
        setDrag(false)
        let files = [...e.dataTransfer.files]
        setUploadedImage(files[0])
    }

    const fileInfoDiv = uploadedImage ? (
        <div className="uploaded-file">
            <div className={"inner"}>
                <Icon color={"#767676"} size={2} name={"File"}/>
                <div>
                    <p className="file-name">
                        {uploadedImage.name}
                    </p>
                    <p className="file-type">
                        {uploadedImage.type}
                    </p>
                </div>
            </div>
            <p className="file-size">
                {(Math.round(uploadedImage.size / (Math.pow(1024, 2))).toFixed(2))} MB
            </p>
            {/*@ts-ignore */}
            <XMarkIcon width={30} color={"#767676"} onClick={()=>{setUploadedImage(null)}}/>
        </div>
    ) : ''

    return (
        <>
            <div className={`image-upload-placeholder-container ${drag ? 'active-drag' : ''}`}
                 onDragStart={e => dragStartHandler(e)}
                 onDragLeave={e => dragLeaveHandler(e)}
                 onDragOver={e => dragStartHandler(e)}
                 onDrop = {e => {onDropHandler(e)}}
            >
                <div className={`container-inner`}>
                    {
                        uploadedImage ?
                            (
                                <>
                                    <img src={URL.createObjectURL(uploadedImage)} alt="uploaded" className={"uploaded-image"}/>
                                    <button className={"close-button"} onClick={()=>{
                                        // @ts-ignore
                                        setUploadedImage(null)}}>
                                        <Icon color={"red"} size={1} name={"Close"}/>
                                        Закрыть
                                    </button>
                                </>
                            ) :
                            (
                                <>
                                    <Icon color={"#C2C2C2"} size={2} name={"Image"}/>
                                    <p className="title">{drag ? 'Отпустите' : 'Перетащите'} изображение сюда или <a href="/">Выберите</a></p>
                                    <p className="subtitle">Рекомендуется: 1600x900 или больше</p>
                                </>
                            )
                    }
                </div>
            </div>
            {fileInfoDiv}
        </>
    )
}