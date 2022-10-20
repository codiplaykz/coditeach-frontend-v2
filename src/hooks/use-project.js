import {useSelector} from "react-redux";

export function useProject() {
    const {project} = useSelector(state => state)

    return project
}