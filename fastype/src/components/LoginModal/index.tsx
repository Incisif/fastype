import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  loginUserThunk,
  googleSignInThunk,
} from "../../features/user/userThunks.ts";
import { RootState } from "../../store/store.ts";
import { useState } from "react";
import { AppDispatch } from "../../store/store";
import ThreeDButton from "../ThreeDButton/index.tsx";
import googleGLogo from "../../assets/Google__G__logo.svg";

type LoginModalProps = {
  onClose: () => void;
};

const Content = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 590px;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 1rem;
  h2 {
    color: var(--grey-color);
    font-size: 24px;
    text-align: center;
    margin-bottom: 1rem;
  }
  p {
    color: var(--grey-color);
    text-align: center;
    margin: 1rem 0;
  }
  button {
    text-align: center;
    padding: 10px;
    width: 100%;
    font-size: 16px;
  }
`;

const CloseButton = styled.a`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--grey-color);
`;

const SigninWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: var(--grey-color);
  padding: 0 3rem;
`;
const SigninForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 100%;

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
    color: white;
  }
`;
const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: var(--grey-color);
  padding: 0 3rem;
`;
const SignUpForm = styled.form`

display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 100%;

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
    color: white;
  }
}
`;
//lien stylisé pour les mots de passe oublié
const StyledPasswordLink = styled.a`
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
`;
const StyledSignUpLink = styled.a`
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  span {
    text-decoration: underline;
    &:hover {
      color: blue;
    }
  }
`;
const NameWrapper = styled.div`
  display: flex;
  
`;
const NameInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap:1rem;
  &:first-child {
    padding-right: 0.5rem;
  }
  &:last-child {
    padding-left: 0.5rem;
  }
`;

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const loginState = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState(false);
  console.log(email, password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const action = await dispatch(loginUserThunk({ email, password }));
    if (loginUserThunk.fulfilled.match(action)) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };
  const handleGoogleSignIn = () => {
    dispatch(googleSignInThunk());
  };

  const handleShowRegisterForm = () => {
    setIsRegistering(!isRegistering);
  };
  return (
    <Content>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      {!isRegistering ? (
        <SigninWrapper>
          <h2>Connexion</h2>
          <ThreeDButton
            onClick={handleGoogleSignIn}
            $backgroundColor="white"
            $shadowColor="#215EFB"
            color="#0A335C"
          >
            {" "}
            <img src={googleGLogo} alt="Google sign-in" />
            Connecte toi avec Google !
          </ThreeDButton>
          <p>ou</p>
          <SigninForm onSubmit={handleSubmit}>
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
            <StyledPasswordLink href="/forgot-password">
              Mot de passe oublié ?
            </StyledPasswordLink>
            <ThreeDButton
              type="submit"
              $backgroundColor="var(--orange-color)"
              $shadowColor="var(--shadow-connexion-button)"
              color="grey"
            >
              Connexion
            </ThreeDButton>
            <StyledSignUpLink onClick={handleShowRegisterForm}>
              Pas encore inscrit ? <span> Inscris-toi</span>
            </StyledSignUpLink>
          </SigninForm>
          {loginState.message && <div>{loginState.message}</div>}
        </SigninWrapper>
      ) : (
        <SignUpWrapper>
          <h2>Inscription</h2>
          <ThreeDButton
            onClick={handleGoogleSignIn}
            $backgroundColor="white"
            $shadowColor="#215EFB"
            color="#0A335C"
          >
            {" "}
            <img src={googleGLogo} alt="Google sign-in" />
            Inscrits toi avec Google !
          </ThreeDButton>
          <p>ou</p>
          <SignUpForm>
            <label htmlFor="signUpEmail">Email</label>
            <input
              type="email"
              name="signUpEmail"
              id="signUpEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <NameWrapper>
              <NameInputWrapper>
              <label htmlFor="signUpLastName">Nom</label>
                <input
                  type="text"
                  name="signUpLastName"
                  id="signUpLastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </NameInputWrapper>
              <NameInputWrapper>
                <label htmlFor="signUpFirstName">Prénom</label>
                <input
                  type="text"
                  name="signUpFirstName"
                  id="signUpFirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </NameInputWrapper>
            </NameWrapper>

            <label htmlFor="signUpPassword">Mot de passe</label>
            <input
              type="password"
              name="signUpPassword"
              id="signUpPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <ThreeDButton
              type="submit"
              $backgroundColor="var(--orange-color)"
              $shadowColor="var(--shadow-connexion-button)"
              color="grey"
            >
              Inscritpion
            </ThreeDButton>
            <StyledSignUpLink onClick={handleShowRegisterForm}>
              Déjà inscrit? <span> Connecte-toi!</span>
            </StyledSignUpLink>
          </SignUpForm>
        </SignUpWrapper>
      )}
    </Content>
  );
};

export default LoginModal;
