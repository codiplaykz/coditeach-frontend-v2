import {useNavigate} from "react-router-dom";
import Icon from "../helpers/Icon";

interface GoBackButtonProps {
    title: string,
    path: string
}

export default function GoBackButton({title, path}: GoBackButtonProps) {
    const navigate = useNavigate()

    const redirect = () => {
        navigate(path)
    }

    return (
        <button className="go-back-button" onClick={redirect}>
            <Icon color={"#4CA0FC"} size={1} name={"Back"}/>
            <p>{title}</p>
        </button>
    )
}