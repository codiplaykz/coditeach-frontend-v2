import Icon from "./Icon";
import '../styles/helpers/spinner.scss'

interface SpinnerProps {
    color: string,
    size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}

export default function Spinner({color, size}: SpinnerProps) {
    return (
        <div>
            {/*@ts-ignore*/}
            <Icon className="spinner" color={color} size={size} name={"Loading"}/>
        </div>
    )
}