import {useDispatch} from "react-redux";
import {removeUser} from "../store/slices/userSlice";

export default function HomePage() {
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(removeUser())
    }

    return (
        <>
            Home page
            <button onClick={logout}>Logout</button>
        </>
    )
}