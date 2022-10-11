import {useSelector} from "react-redux";

export function useAuth() {
    const {email} = useSelector(state => state.user)

    return email
}