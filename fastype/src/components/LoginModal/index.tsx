import styled from "styled-components";
import {  useDispatch } from "react-redux";
import {
  loginUserThunk,
  googleSignInThunk,
  createUserThunk,
} from "../../features/user/userThunks.ts";
import { rememberMe } from "../../features/user/userSlice.ts";
import { useState } from "react";
import { AppDispatch } from "../../store/store";
import ThreeDButton from "../ThreeDButton/index.tsx";
import googleGLogo from "../../assets/Google__G__logo.svg";
import PasswordInput from "../PasswordInput/index.tsx";

type LoginModalProps = {
  onClose: () => void;
  initialMode: "login" | "signup";
};

const Content = styled.div`
  position: absolute;
  z-index: 99;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 620px;
  background-color: white;
  backdrop-filter: blur(18px);
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 1rem;

  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3);
  h2 {
    color: var(--grey-color);
    font-size: 24px;

    margin: 2rem 0 3rem 0;
  }
  p {
    color: var(--grey-color);

    margin-top: 2rem;
  }
  button {
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

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: var(--grey-color);
  padding: 0 3rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  label {
    font-size: 16px;
    font-weight: bold;
    margin: 2rem 0 0.3rem 0;
  }

  input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    color: white;
    margin-top: 2.5rem;
  }
  #rememberme {
    margin-right: 0.5rem;
    cursor: pointer;
  }
`;

const SignupForm = styled(StyledForm)`
  label {
    margin-top: 1rem;
  }
`;

const ForgotPasswordLink = styled.a`
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
  margin-top: 0.5rem;
`;
const StyledSignUpLink = styled.a`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
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

  &:first-child {
    padding-right: 0.5rem;
  }
  &:last-child {
    padding-left: 0.5rem;
  }
`;
const RememberMeWrapper = styled.div`
  margin-top: 0.5rem;
  label {
    cursor: pointer;
  }
`;
const RemberberMeCheckbox = styled.input`
  cursor: pointer;
`;

const LoginModal: React.FC<LoginModalProps> = ({ onClose, initialMode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signUpPassword, setSignUpPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState(initialMode === "signup");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleConnectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { email: "", password: "", firstName: "", lastName: "" };
    let isValid = true;

    if (!validateEmail(email)) {
      newErrors.email = "Email invalide";
      isValid = false;
    }
    if (password.length < 6) {
      newErrors.password = "Mot de passe trop court";
      isValid = false;
    }
    if (!password || !email) {
      newErrors.email = "Veuillez remplir tous les champs";
      newErrors.password = "Veuillez remplir tous les champs";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) {
      return;
    }

    const action = await dispatch(loginUserThunk({ email, password }));
    if (loginUserThunk.fulfilled.match(action)) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const handleGoogleSignIn = async () => {
    const action = await dispatch(googleSignInThunk());
    if (googleSignInThunk.fulfilled.match(action)) {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { email: "", password: "", firstName: "", lastName: "" };
    let isValid = true;

    if (!validateEmail(email)) {
      newErrors.email = "Email invalide";
      isValid = false;
    }

    if (signUpPassword.length < 6) {
      newErrors.password = "Mot de passe trop court";
      isValid = false;
    } else if (!signUpPassword) {
      newErrors.password = "Champs requis";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "Champs requis";
      isValid = false;
    }

    if (!firstName) {
      newErrors.firstName = "Champs requis";
      isValid = false;
    }

    if (!lastName) {
      newErrors.lastName = "Champs requis";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) {
      return;
    }

    const signUpAction = await dispatch(
      createUserThunk({ email, password: signUpPassword, firstName, lastName })
    );
    if (createUserThunk.fulfilled.match(signUpAction)) {
      const loginAction = await dispatch(
        loginUserThunk({ email, password: signUpPassword })
      );
      if (loginUserThunk.fulfilled.match(loginAction)) {
        setTimeout(() => {
          onClose();
        }, 300);
      }
    }
  };

  const handleShowRegisterForm = () => {
    setIsRegistering(!isRegistering);
  };

  const handleCheckRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(rememberMe(e.target.checked));
  };
  return (
    <Content>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      {!isRegistering ? (
        <FormWrapper>
          <h2>Connexion</h2>
          <ThreeDButton
            onClick={handleGoogleSignIn}
            $backgroundColor="white"
            $shadowColor="#215EFB"
            color="#0A335C"
            type="button"
          >
            {" "}
            <img src={googleGLogo} alt="Google sign-in" />
            Connecte-toi avec Google !
          </ThreeDButton>
          <p>ou</p>
          <StyledForm onSubmit={handleConnectionSubmit} noValidate>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" }); // Réinitialiser l'erreur pour email
              }}
              autoComplete="email"
            />
            {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}

            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {errors.password && (
              <div style={{ color: "red" }}>{errors.password}</div>
            )}
            <ForgotPasswordLink href="/forgot-password">
              Mot de passe oublié ?
            </ForgotPasswordLink>
            <ThreeDButton
              type="submit"
              $backgroundColor="var(--orange-color)"
              $shadowColor="var(--shadow-connexion-button)"
              color="grey"
            >
              Connexion
            </ThreeDButton>
            <RememberMeWrapper>
              <RemberberMeCheckbox
                type="checkbox"
                name="rememberme"
                id="rememberme"
                onChange={handleCheckRememberMe}
              ></RemberberMeCheckbox>{" "}
              <label htmlFor="rememberme">Rester connecté</label>
            </RememberMeWrapper>
            <StyledSignUpLink onClick={handleShowRegisterForm}>
              Pas encore inscrit ? <span> Inscris-toi</span>
            </StyledSignUpLink>
          </StyledForm>
        </FormWrapper>
      ) : (
        <FormWrapper>
          <h2>Inscription</h2>
          <ThreeDButton
            onClick={handleGoogleSignIn}
            $backgroundColor="white"
            $shadowColor="#215EFB"
            color="#0A335C"
            type="button"
          >
            {" "}
            <img src={googleGLogo} alt="Google sign-in" />
            Inscris-toi avec Google !
          </ThreeDButton>
          <p>ou</p>
          <SignupForm onSubmit={handleSignupSubmit} noValidate>
            <label htmlFor="signUpEmail">Email</label>
            <input
              type="email"
              name="signUpEmail"
              id="signUpEmail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
              autoComplete="email"
            />
            {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
            <NameWrapper>
              <NameInputWrapper>
                <label htmlFor="signUpLastName">Nom</label>
                <input
                  type="text"
                  name="signUpLastName"
                  id="signUpLastName"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setErrors({ ...errors, lastName: "" });
                  }}
                  autoComplete="family-name"
                />
                {errors.lastName && (
                  <div style={{ color: "red" }}>{errors.lastName}</div>
                )}
              </NameInputWrapper>

              <NameInputWrapper>
                <label htmlFor="signUpFirstName">Prénom</label>
                <input
                  type="text"
                  name="signUpFirstName"
                  id="signUpFirstName"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setErrors({ ...errors, firstName: "" });
                  }}
                  autoComplete="given-name"
                />
                {errors.firstName && (
                  <div style={{ color: "red" }}>{errors.firstName}</div>
                )}
              </NameInputWrapper>
            </NameWrapper>

            <PasswordInput
              onChange={(e) => {
                setSignUpPassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
              value={signUpPassword}
            />
            {errors.password && (
              <div style={{ color: "red" }}>{errors.password}</div>
            )}

            <ThreeDButton
              type="submit"
              $backgroundColor="var(--orange-color)"
              $shadowColor="var(--shadow-connexion-button)"
              color="grey"
            >
              Inscription
            </ThreeDButton>
            <StyledSignUpLink onClick={handleShowRegisterForm}>
              Déjà inscrit? <span> Connecte-toi!</span>
            </StyledSignUpLink>
          </SignupForm>
        </FormWrapper>
      )}
    </Content>
  );
};

export default LoginModal;
