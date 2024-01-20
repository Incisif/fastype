import Main from "../../layouts/MainContent";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks";
import { useEffect, useState } from "react";
import FastypeLogo from "../../assets/fastype_Logo.webp";
import LoginModal from "../../components/LoginModal";
import { device } from "../../styles/breakpoints";

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
  margin-top: 5rem;

  transform: translateX(-4rem);
  @media ${device.sm} {
    margin-top: 2rem;
  }
  @media ${device.md} {
    flex-direction: column;
    transform: translateX(0rem);
    margin-top: 3rem;
  }
`;
const TitleTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 70%;
  @media ${device.lg} {
    width: 65%;
  }
`;
const Title = styled.h2`
  font-size: 4rem;
  font-weight: 700;
  color: var(--dark-blue-color);
  text-align: center;
  margin-bottom: 1rem;
  @media ${device.sm} {
    font-size: 3rem;
  }
  @media ${device.lg} {
    font-size: 3rem;
  }
`;
const Image = styled.img`
  width: 100%;
  max-width: 10rem;
  margin-right: 1rem;
  @media ${device.sm} {
    margin-right: 0;
    margin-bottom: 1rem;
  }
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
  font-size: 1.8rem;
  line-height: 1.5;
  @media ${device.sm} {
    font-size: 1.4rem;
  }
`;

const SubTitle = styled.h3`
  margin-top: 3rem;
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--dark-blue-color);
  text-align: center;
  @media ${device.sm} {
    margin-top: 1rem;
  }
  @media ${device.lg} {
    font-size: 2rem;
  }
`;
const HowItWorksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 38%;
  border-radius: 1rem;
  padding: 1rem 0;
  @media ${device.md} {
    width: 80%;
  }
`;
const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
  li {
    margin-top: 2.5rem;
  }
  li:first-child {
    margin-top: 1rem;
  }
`;
const NumberedCard = styled.div`
  display: flex;
  align-items: center;

  padding: 0 1rem 0 0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  height: 5rem;
  border-radius: 0.8rem;
  p {
    font-size: 1.6rem;
    font-weight: 500;
    @media ${device.sm} {
      font-size: 1.3rem;
    }
  }
`;
const CardsNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 100%;
  color: var(--white-color);
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  margin-right: 1rem;
  border-radius: 0.8rem 0 0 0.8rem;
`;
const FirstStyledCircle = styled(CardsNumber)`
  background-color: var(--orange-color);
`;
const SecondStyledCircle = styled(CardsNumber)`
  background-color: var(--violet-color);
`;
const ThirdStyledCircle = styled(CardsNumber)`
  background-color: var(--red-color);
`;
const FourthStyledCircle = styled(CardsNumber)`
  background-color: var(--blue-color);
`;
const SignInSignUpCallToAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 7.2rem;
  width: 90%;
  p {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 1.8rem;
    line-height: 1.5;
    @media ${device.sm} {
      font-size: 1.4rem;
    }
    @media ${device.lg} {
      font-size: 1.6rem;
    }
  }
  h3 {
    @media ${device.sm} {
      font-size: 2rem;
    }
  }
`;
const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
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
            <li>
              <NumberedCard>
                <FirstStyledCircle>1</FirstStyledCircle>
                <p>Créez votre compte</p>
              </NumberedCard>
            </li>
            <li>
              <NumberedCard>
                <SecondStyledCircle>2</SecondStyledCircle>
                <p>Choisissez votre niveau</p>
              </NumberedCard>
            </li>
            <li>
              <NumberedCard>
                <ThirdStyledCircle>3</ThirdStyledCircle>
                <p>Commencez votre entraînement</p>
              </NumberedCard>
            </li>
            <li>
              <NumberedCard>
                <FourthStyledCircle>4</FourthStyledCircle>
                <p>Observez vos progrès</p>
              </NumberedCard>
            </li>
          </StyledList>
        </HowItWorksContainer>
        <SignInSignUpCallToAction>
          <SubTitle>
            Prêt à commencer ? Rejoignez-nous dès aujourd'hui !
          </SubTitle>
          <StyledButton onClick={handleModalToggle}>Inscription</StyledButton>

          <p>
            Connectez-vous pour accéder à votre tableau de bord personnalisé et
            commencer votre voyage vers la maîtrise de la frappe au clavier.
          </p>
        </SignInSignUpCallToAction>
        {isModalOpen && (
          <LoginModal onClose={handleModalToggle} initialMode="signup" />
        )}
      </HomeContainer>
    </Main>
  );
};

export default Home;
