import {useSelector} from "react-redux";

export function useCurriculum() {
    const {curriculum} = useSelector(state => state)

    return curriculum
}