import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const useAuth = () => {
  const user = useSelector((state: RootState) => state.login.user);
  return { isAuthenticated: !!user, user };
};

export default useAuth;
