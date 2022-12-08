import CurriculumResponse from "../../../interfaces/CurriculumResponse";
import Icon from "../../../helpers/Icon";
import Spinner from "../../../helpers/Spinner";
import Divider from "../../../components/Divider";

interface CurriculumsListProps {
    curriculumList: CurriculumResponse[] | null
}

export default function CurriculumsList({curriculumList}: CurriculumsListProps) {
    if (curriculumList === null) {
        return (
            <div className={"center"} style={{height: '30vh'}}>
                <div style={{alignItems: "center", display: 'flex', flexDirection: 'column'}}>
                    <Spinner color={"#4CA0FC"} size={2}/>
                    <p>
                        Загрузка учебных планов
                    </p>
                </div>
            </div>
        )
    }

    if (curriculumList?.length === 0) {
        return (
            <div style={{margin: '50px', textAlign: "center", fontWeight: '700', color: "gray"}}>
                Нету добавленных проектов
            </div>
        )
    }

    const renderedCurriculums = curriculumList.map((curriculum, index) => {
        let modulesCount = curriculum.modules.length
        let blocksCount = 0
        let lessonsCount = 0
        let date = new Date(curriculum.created_at)

        curriculum.modules.forEach(module => {
            blocksCount += module.blocks.length
            module.blocks.forEach(block => {
                lessonsCount += block.lessons.length
            })
        })

        return (
            <>
                <div className="curriculum-item" key={`curriculum-${index}`}>

                    <div className="info">
                        <p className="title">{curriculum.title}</p>
                        <p className="counts">
                            {modulesCount} модулей
                            <span className="dot"></span>
                            {blocksCount} блоков
                            <span className="dot"></span>
                            {lessonsCount} уроков
                        </p>
                        <p className="created-date">
                            <Icon color={"#C2C2C2"} size={1} name={"Date"}/>
                            {date.toDateString()}
                        </p>
                        <p className="name">
                            <Icon color={"#C2C2C2"} size={1} name={"User"}/>
                            {curriculum.name}
                        </p>
                    </div>
                    <div className="button">
                        <Icon color={"#C2C2C2"} size={1} name={"More"}/>
                    </div>
                </div>
                <Divider/>
            </>
        )
    })

    return (
        <div className="curriculums-list">
            {renderedCurriculums}
        </div>
    )
}