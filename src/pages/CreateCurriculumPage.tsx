import CurriculumStructure from "../features/Curriculums/components/CurriculumStructure";
import LessonConstructor from "../features/Curriculums/components/LessonConstructor";
import {useCurriculum} from "../hooks/use-curriculum";
import {useDispatch} from "react-redux";
import {setSelectedBlockId, setSelectedModuleId, setShowLessonConstructor} from "../store/slices/curriculumSlice";
import LessonContainer from "../features/Curriculums/components/LessonContainer";
import {composeCurriculum} from "../services/curriculums";
import {useAuth} from "../hooks/use-auth";
import {useState} from "react";
import MessageModal from "../components/MessageModal";

export default function CreateCurriculumPage() {
    const {
        modules,
        title,
        description,
        showLessonConstructor,
        showLessonContainer,
    } = useCurriculum()
    const user = useAuth()
    const [messageModalData, setMessageModalData] = useState<{
        type: 'ok' | 'error',
        title: string
        secondaryButtonText: string
        secondaryButtonLink: string
        primaryButtonText: string
        primaryButtonLink: string
    }>()
    const [showMessageModal, setShowMessageModal] = useState(false)

    const dispatch = useDispatch()

    const closeConstructor = () => {
        dispatch(setSelectedModuleId({moduleId: -1}))
        dispatch(setSelectedBlockId({blockId: -1}))
        dispatch(setShowLessonConstructor({show: false}))
    }

    const isCurriculumExists = () => {
        if (modules.length !== 0) {
            if (modules[0]?.blocks.length !== 0){
                if (modules[0].blocks[0]?.lessons.length !== 0) {
                    return true
                }
            }
        }
        return false
    }

    const createCurriculum = () => {
        if (isCurriculumExists()) {
            let data = {
                user_id: user.Id,
                title: title,
                description: description,
                modules: modules
            }
            composeCurriculum(data).then(res=>{
                if (res?.message === 'Curriculum created') {
                    setMessageModalData({
                        type: 'ok',
                        title: '?????????????? ???????? ????????????',
                        secondaryButtonText: '?????????????????? ?? ?????????????? ???????????? ',
                        secondaryButtonLink: '/curriculums',
                        primaryButtonText: '???????????????????? ?????????????? ????????',
                        primaryButtonLink: '/curriculums',
                    })
                    setShowMessageModal(true)
                    setTimeout(()=>{
                        window.location.href = '/'
                    }, 3000)
                }
            }).catch(err => {
                setMessageModalData({
                    type: 'error',
                    title: '?????????????????? ???????????? ???? ??????????????, ???????????????????? ??????????.',
                    secondaryButtonText: '?????????????????? ?? ?????????????? ???????????? ',
                    secondaryButtonLink: '/curriculums',
                    primaryButtonText: '?????????????? ???? ??????????????',
                    primaryButtonLink: '/',
                })
                setShowMessageModal(true)
            })
        }
    }

    return (
        <div className="create-curriculum-page">
            {
                showMessageModal && (
                    <MessageModal type={messageModalData!.type} title={messageModalData!.title}
                                  open={showMessageModal} setOpen={setShowMessageModal}
                                  secondaryButtonText={messageModalData!.secondaryButtonText}
                                  secondaryButtonLink={messageModalData!.secondaryButtonLink}
                                  primaryButtonText={messageModalData!.primaryButtonText}
                                  primaryButtonLink={messageModalData!.primaryButtonLink}/>
                )
            }

            <div className="curriculums-sidebar">
                <p className="title">
                    ???????????????? ???????????????? ??????????
                </p>
                <CurriculumStructure/>
                <br/>
                {
                    isCurriculumExists() && (
                        <button className="active-button" onClick={createCurriculum}>
                            ?????????????? ?????????????? ????????
                        </button>
                    )
                }
            </div>
            {
                showLessonConstructor && <LessonConstructor close={()=>{closeConstructor()}}/>
            }
            {
                showLessonContainer && <LessonContainer/>
            }
        </div>
    )
}