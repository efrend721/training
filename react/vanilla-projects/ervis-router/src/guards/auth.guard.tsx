import { useSelector } from "react-redux";
import { AppStore } from "../redux/store";

export const AuthGuard = () => {
    const userState = useSelector((store: AppStore) => store.user);
    return userState.id > 0 ? <Outlet /> : <Navigate replace to  />;
}
