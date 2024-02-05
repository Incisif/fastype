import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { clearMessage } from "../../features/user/userSlice"; // Importez votre action de nettoyage
import styled from "styled-components";

const MessageContainer = styled.div`
  position: fixed; 
  right: 1rem;
  top: 1rem;
  color: #19d4ac;
  background-color: white;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid #19d4ac;
  z-index: 100;
`;

const LoginStateMessage = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.login.message);

  useEffect(() => {
    if (loginState) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loginState, dispatch]);
  return loginState ? <MessageContainer>{loginState}</MessageContainer> : null;
};

export default LoginStateMessage;
