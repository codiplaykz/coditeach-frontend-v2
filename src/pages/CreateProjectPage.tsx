import GoBackButton from "../components/GoBackButton";
import Icon from "../helpers/Icon";
import {useProject} from "../hooks/use-project";
import {useEffect, useState} from "react";
import EditProjectModal from "../features/Projects/components/EditProjectModal";
import ImageUploadPlaceholder from "../helpers/ImageUploadPlaceholder";
import {useNavigate} from "react-router-dom";
import ConfirmActionModal from "../components/ConfirmActionModal";
import {createProject} from "../services/project";
import Spinner from "../helpers/Spinner";
import AlertMessage from "../helpers/AlertMessage";
import MessageModal from "../components/MessageModal";

export default function CreateProjectPage() {
    const projectData = useProject()
    const navigate = useNavigate()
    const [onClose, setOnClose] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editProjectModalShow, setProjectModalShow] = useState(false)
    const [alertShow, setAlertShow] = useState(false)
    const [alertType, setAlertType] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [status, setStatus] = useState<number>()
    const [showStatus, setShowStatus] = useState(false)

    const [techComponents, setTechComponents] = useState<{name: string, quantity: number}[]>([])
    const [techComponentValue, setTechComponentValue] = useState('')
    const [techComponentQuantityValue, setTechComponentQuantityValue] = useState(1)
    const [coverImage, setCoverImage] = useState<File>()
    const [schemaImage, setSchemaImage] = useState<File>()
    const [duration, setDuration] = useState<number>(0)
    const [buyBoxLink, setBuyBoxLink] = useState<string>('')
    const [desc, setDesc] = useState('')

    const submitData = () => {
        setLoading(true)
        if (techComponents.length !== 0 && coverImage !== null && schemaImage !== null && duration !== 0
            && buyBoxLink !== '' && desc !== '') {
            let data = new FormData()
            data.append('name', projectData.projectName)
            data.append('desc', desc)
            data.append('duration', ''+duration)
            data.append('purchase_box_link', ''+buyBoxLink)
            data.append('p_type', projectData.projectType)
            data.append('level', projectData.projectLevel)
            data.append('tech_components', JSON.stringify(techComponents))
            // @ts-ignore
            data.append('cover_image', coverImage)
            // @ts-ignore
            data.append('schema_image', schemaImage)

            createProject(data).then(res=>{
                console.log(res)
                setStatus(200)
                setShowStatus(true)
            }).catch(err=>{
                console.log(err)
                setStatus(500)
                setShowStatus(true)
            })
        } else {
            setAlertShow(true)
            setAlertType("Info")
            setAlertMessage("?????????????????? ?????? ????????!")
            setLoading(false)
        }
    }

    // @ts-ignore
    const handleTechComponentValueChange = (e) => {
        setTechComponentValue(e.target.value)
    }

    // @ts-ignore
    const handleTechComponentQuantityValueChange = (e) => {
        let {value, min, max} = e.target
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        setTechComponentQuantityValue(value)
    }

    const addComponent = () => {
        if (techComponentValue.length !== 0) {
            let item = {
                name: techComponentValue,
                quantity: techComponentQuantityValue
            }
            let array = [...techComponents, item]
            // @ts-ignore
            setTechComponents(array)
            setTechComponentValue('')
            setTechComponentQuantityValue(1)
        }
    }

    const removeComponent = (index: number) => {
        let array = [...techComponents]
        array.splice(index, 1)
        setTechComponents(array)
    }

    const openEditProjectModal = () => {
        setProjectModalShow(true)
    }

    const redirect = (path: string) => {
        navigate(path)
    }

    useEffect(()=>{
        if (projectData.projectLevel === '' || projectData.projectName === '' || projectData.projectName === '') {
            redirect('/projects')
        }
    })

    // @ts-ignore
    const renderedTechComponents = techComponents.map((item, index) => {
        return (
            <div className={"component"} key={`component-${index}`}>
                <p>{item.name}</p>
                <span>{item.quantity} ????. </span>
                {/*@ts-ignore*/}
                <Icon color={"red"} size={1} name={"Remove"} onClick={()=>removeComponent(index)}/>
            </div>
        )
    })

    const doneAlertMessage = (<MessageModal type={"ok"}
                                            title={`???????????? ?????????????? ????????????!`}
                                            open={showStatus}
                                            setOpen={setShowStatus}
                                            secondaryButtonText={"?? ???????????? ????????????????"}
                                            secondaryButtonLink={"/projects"}
                                            primaryButtonText={"???????????????????? ????????????"}
        // TODO PROJECT PAGE
                                            primaryButtonLink={"/projects"}/>)

    const errorAlertMessage = (<MessageModal type={"error"}
                                            title={`??????-???? ?????????? ???? ??????...`}
                                            open={showStatus}
                                            setOpen={setShowStatus}
                                            secondaryButtonText={"??????????????"}
                                            secondaryButtonLink={"/projects"}
                                            primaryButtonText={"?????????????????????? ??????????"}
                                            primaryButtonLink={"/"}/>)

    return (
        <div className="create-project-page">
            {/*@ts-ignore  */}
            <AlertMessage open={alertShow} setOpen={setAlertShow} messageText={alertMessage} messageType={alertType}/>
            <EditProjectModal open={editProjectModalShow} setOpen={setProjectModalShow} projectData={projectData}/>
            <ConfirmActionModal open={onClose} setOpen={setOnClose}
                                title={"???? ?????????????????????????? ???????????? ???????????????? ?????????????????"}
                                info={"?????????????????? ???? ????????????????????"} confirmAction={()=>{redirect("/projects")}}/>
            {
                status === 200 && doneAlertMessage
            }

            {
                status === 500 && errorAlertMessage
            }

            <GoBackButton title={'?? ???????????? ????????????????'} path={'/projects'}/>

            <div className="page-header">
                <p className="header-title">???????????????? ??????????????</p>

                <div className="buttons">
                    <button className="not-active-button" onClick={()=>{setOnClose(true)}}>????????????????</button>
                    <button className="active-button" onClick={submitData}>
                        {
                            loading ? <Spinner color={"white"} size={1}/> : '???????????????????????? ?????? ????????'
                        }
                    </button>
                </div>
            </div>

            <div className="page-container">
                <div className="inner-container">
                    <div className="project-info">
                        <div className="project-info-header">
                            <div className="info">
                                <p className="project-type">
                                    {projectData.projectType}
                                </p>
                                <p className="project-name">
                                    {projectData.projectName}
                                </p>
                                <p className="project-level">
                                    {projectData.projectLevel}
                                </p>
                            </div>
                            <div className="project-buttons">
                                <div className="project-button" onClick={openEditProjectModal}>
                                    <Icon color={"black"} size={1} name={"Edit"}/>
                                </div>
                            </div>
                        </div>

                        <div className="project-details">
                            <div className="project-cover-image">
                                <div className="title">
                                    ??????????????
                                </div>
                                {/*@ts-ignore*/}
                                <ImageUploadPlaceholder uploadedImage={coverImage} setUploadedImage={setCoverImage}/>
                            </div>

                            <div className="project-scheme-image">
                                <div className="title">
                                    C????????
                                </div>
                                {/*@ts-ignore*/}
                                <ImageUploadPlaceholder uploadedImage={schemaImage} setUploadedImage={setSchemaImage}/>
                            </div>

                            <div className="project-description">
                                <div className="title">
                                    ????????????????
                                </div>

                                <textarea value={desc} onChange={(e)=>{setDesc(e.target.value)}} rows={8} className="default-input"/>
                            </div>
                        </div>
                    </div>

                    <div className="project-additional-details">
                        <div className="title">
                            <Icon color={"#4CA0FC"} size={1} name={"Time"}/>
                            <p>
                                ?????????? ???? ????????????????????
                            </p>
                        </div>
                        
                        <div className="input">
                            <input value={duration} onChange={(e)=>{setDuration(+e.target.value)}}
                                   type="number"
                                   placeholder={"???????????????????? ?????????? ???? ????????????????????"} className="default-input"/>
                        </div>
                    </div>

                    <div className="project-additional-details">
                        <div className="title">
                            <Icon color={"#4CA0FC"} size={1} name={"TechComponents"}/>
                            <p>
                                ?????????????????????? ????????????????????
                            </p>
                        </div>

                        <div className="inputs">
                            <input type="text" value={techComponentValue}
                                   onChange={(e) => handleTechComponentValueChange(e)}
                                   placeholder={"?????????????? ???????????????? ????????????????????"}
                                   className="default-input"/>

                            <input type="number" min="1" max="1000" required value={techComponentQuantityValue}
                                   onChange={(e) => handleTechComponentQuantityValueChange(e)}
                                   placeholder={"?????????????? ????????????????????"}
                                   className="default-input"/>

                            <button className="active-button" onClick={addComponent}>
                                <Icon color={"white"} size={1} name={"Add"}/>
                            </button>
                        </div>

                        <div className="components">
                            {renderedTechComponents}
                        </div>
                    </div>

                    <div className="project-additional-details">
                        <div className="title">
                            <Icon color={"#4CA0FC"} size={1} name={"Links"}/>
                            <p>
                                ???????????? ?????? ?????????????? ????????????
                            </p>
                        </div>

                        <div className="input">
                            <input type="url" value={buyBoxLink} onChange={(e)=>{setBuyBoxLink(e.target.value)}}
                                   className="default-input" placeholder={"?????????????? ???????????? ?????? ?????????????? ????????????"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}