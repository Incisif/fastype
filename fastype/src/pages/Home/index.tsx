import Main from "../../layouts/MainContent";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks";
import { useEffect, useState } from "react";
import FastypeLogo from "../../assets/fastype_Logo.png";
import LoginModal from "../../components/LoginModal";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  transform: translateX(-4rem);
`;
const TitleTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 70%;
`;
const Title = styled.h2`
  font-size: 4rem;
  font-weight: 700;
  color: var(--dark-blue-color);
  text-align: center;
  margin-bottom: 1rem;
`;
const Image = styled.img`
  width: 100%;
  max-width: 10rem;
`;
const TitleText = styled.p`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.4rem;
  line-height: 1.5;
`;

const SubTitle = styled.h3`
  margin-top: 3rem;
  font-size: 2rem;
  font-weight: 700;
  color: var(--dark-blue-color);
`;
const HowItWorksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  background-color: var(--light-green-color);
  border-radius: 1rem;
  color: white;
  padding: 1rem 0 1rem 4rem;
  margin-top: 4rem;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  h3 {
    color: white;
    margin-top: 1rem;
  }
`;
const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 4;
  font-size: 1.4rem;
  margin-top: 1rem;
`;
const LiWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const NumberedCircle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  color: var(--white-color);
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  margin-right: 1rem;
`;
const FirstStyledCircle = styled(NumberedCircle)`
  background-color: var(--orange-color);
`;
const SecondStyledCircle = styled(NumberedCircle)`
  background-color: var(--violet-color);
`;
const ThirdStyledCircle = styled(NumberedCircle)`
  background-color: var(--red-color);
`;
const FourthStyledCircle = styled(NumberedCircle)`
  background-color: var(--blue-color);
`;
const SignInSignUpCallToAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 7.2rem;
  p {
    width: 80%;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.5rem;
    line-height: 1.5;
  }
`;
const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  padding: 5px 10px;
  font-size: 1.2rem;
  background-color: var(--dark-violet-color);
  color: white;
  transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
  font-size: 2rem;
  padding: 1rem 2rem;
  &:hover {
    background-color: var(--violet-color);
    transform: translateY(-2px);
    box-shadow: 0 3px 0 var(--dark-blue-color);
  }
  &:active {
    transform: translateY(0px);
    box-shadow: none;
    background-color: var(--dark-violet-color);
  }
`;
const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/training");
    }
  }, [isAuthenticated, navigate]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Main>
      <HomeContainer>
        <TitleContainer>
          <Image src={FastypeLogo} alt="keyboard" />
          <TitleTextContainer>
            <Title>Bienvenue sur Fastype !</Title>
            <TitleText>
              Commencez à améliorer votre vitesse de frappe au clavier et votre
              précision avec Fastype.
            </TitleText>
          </TitleTextContainer>
        </TitleContainer>
        <HowItWorksContainer>
          <SubTitle>Comment ça marche ?</SubTitle>
          <StyledList>
            <LiWrapper>
              <FirstStyledCircle>1</FirstStyledCircle>Créez votre compte
            </LiWrapper>
            <LiWrapper>
              <SecondStyledCircle>2</SecondStyledCircle>Choisissez votre niveau
            </LiWrapper>
            <LiWrapper>
              <ThirdStyledCircle>3</ThirdStyledCircle>Commencez votre
              entraînement
            </LiWrapper>
            <LiWrapper>
              <FourthStyledCircle>4</FourthStyledCircle>Observez vos progrès
            </LiWrapper>
          </StyledList>
        </HowItWorksContainer>
        <SignInSignUpCallToAction>
          <SubTitle>
            Prêt à commencer ? Rejoignez-nous dès aujourd'hui !
          </SubTitle>
          <StyledButton onClick={handleModalToggle}>Inscritpion</StyledButton>

          <p>
            Connectez-vous pour accéder à votre tableau de bord personnalisé et
            commencer votre voyage vers la maîtrise de la frappe au clavier.
          </p>
        </SignInSignUpCallToAction>
        {isModalOpen && <LoginModal onClose={handleModalToggle} initialMode="signup" />}
      </HomeContainer>
    </Main>
  );
};

export default Home;
