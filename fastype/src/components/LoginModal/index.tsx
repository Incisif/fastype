import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { loginUserThunk } from "../../features/user/userThunks.ts";
import { RootState } from "../../store/store.ts";
import { useState } from "react";
import { AppDispatch } from '../../store/store'

type LoginModalProps = {
  onClose: () => void;
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  background-color: var(--primary-color);
  transform: translate(-50%, -50%);
  border-radius: 5px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--font-color);
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 300px;

  label {
    font-size: 16px;
    font-weight: bold;
  }

  input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px;
    font-size: 16px;
    background-color: var(--accent-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  
  const loginState = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("About to dispatch loginUserThunk");
    const action = await dispatch(loginUserThunk({ email, password }));
    console.log("Action:", action);
    if (loginUserThunk.fulfilled.match(action)) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };
  return (
    <Content>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <ModalForm onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </ModalForm>
      {loginState.message && <div>{loginState.message}</div>}
    </Content>
  );
};

export default LoginModal;
