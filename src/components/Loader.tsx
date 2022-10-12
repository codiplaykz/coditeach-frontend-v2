import Icon from "../helpers/icon";

interface LoaderProps {
    size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    color: string
}

export default function Loader(props: LoaderProps) {
    const {size, color} = props;

    return (
        <section className={"loader"}>
            <Icon color={color} size={size} name={"Loading"}/>
        </section>
    )
}