import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/use-auth";

// @ts-ignore
export default function ProtectedRoute({children}) {
    // @ts-ignore
    const user = useAuth()

    if (!user) {
        return <Navigate to={'/login'}/>
    }

    return children
}