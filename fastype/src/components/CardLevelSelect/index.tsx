import styled, { css } from "styled-components";
import easy from "../../assets/easy_icon- 1.svg";
import medium from "../../assets/medium_icon- 1.svg";
import hard from "../../assets/hard_icon- 1.svg";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

interface CardContentProps {
  $isEasyInfoIsHovered?: boolean;
  $isMediumInfoIsHovered?: boolean;
  $isHardInfoIsHovered?: boolean;
}

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  width: 100%;
  flex-shrink: 0;
  margin-top: 1.4rem;
`;
const SelectorTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 1.5rem;
`;
const CardContent = styled.div<CardContentProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 23%;
  background-color: var(--white-color);
  border-radius: 25px;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
    box-shadow: 8px 8px 20px 0px rgba(0, 0, 0, 0.2);
  }
  .content {
    transition: transform 0.3s ease-in-out;
  }
  ${(props) =>
    (props.$isEasyInfoIsHovered ||
      props.$isMediumInfoIsHovered ||
      props.$isHardInfoIsHovered) &&
    css`
      .content {
        transform: translateX(140%);
      }
    `}
`;
const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
  margin-top: 1rem;
`;
const CardImage = styled.img`
  width: 100px;
  height: 100px;
  margin: 1rem 1.2rem 1.2rem 1.2rem;
  filter: drop-shadow(4px 4px 2px rgba(0, 0, 0, 0.25));
`;
const CardCaption = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;
const CardInfo = styled.div`
  position: absolute;
  bottom: 0rem;
  right: 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  background-color: var(--grey-color);

  font-size: 1rem;
  clip-path: polygon(100% 1%, 0% 100%, 100% 100%);
`;
const CardInfoText = styled.p`
  position: absolute;
  bottom: 0.5rem;
  right: 0.7rem;
  font-size: 1rem;
  color: var(--white-color);
`;
const LevelDetails = styled.ul<CardContentProps>`
  position: absolute;
  left: -100%;
  top: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
 li{
  margin: 0.5rem 0 0 1rem;
 }
`;
const EasyLevelDetails = styled(LevelDetails)`
  ${(props) =>
    props.$isEasyInfoIsHovered &&
    css`
      transform: translateX(100%);
    `}
`;
const MediumLevelDetails = styled(LevelDetails)`
  ${(props) =>
    props.$isMediumInfoIsHovered &&
    css`
      transform: translateX(100%);
    `}
`;
const HardLevelDetails = styled(LevelDetails)`
  ${(props) =>
    props.$isHardInfoIsHovered &&
    css`
      transform: translateX(100%);
    `}
`;
const CheckIcon = styled(FontAwesomeIcon)`
  color: green;
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;
const XIcon = styled(FontAwesomeIcon)`
  color: red;
  font-size: 1.1rem;
  margin-right: 0.5rem;
`;

const handleOnClick = (e: React.MouseEvent) => {
  e.preventDefault();
  console.log(e.currentTarget.id);
};

const CardLevelSelect: React.FC = () => {
  const [easyInfoIsHovered, setEasyInfoIsHovered] = useState(false);
  const [mediumInfoIsHovered, setMediumInfoIsHovered] = useState(false);
  const [hardInfoIsHovered, setHardInfoIsHovered] = useState(false);

  return (
    <CardsContainer>
      <SelectorTitle>Prêt à Taper ? Sélectionnes ton Niveau !</SelectorTitle>
      <CardWrapper>
        <CardContent
          $isEasyInfoIsHovered={easyInfoIsHovered}
          id="easy"
          onClick={handleOnClick}
        >
          <div className="content">
            <CardTitle>Débutant</CardTitle>
            <CardImage src={easy} />
            <CardCaption>23% du clavier</CardCaption>
          </div>
          <EasyLevelDetails $isEasyInfoIsHovered={easyInfoIsHovered}>
            <li>
              <CheckIcon icon={faCheck}></CheckIcon>Minuscules
            </li>
            <li>
              <XIcon icon={faX}></XIcon>Majuscules
            </li>
            <li>
              <XIcon icon={faX}></XIcon>Ponctuations
            </li>
            <li>
              <XIcon icon={faX}></XIcon>Chiffres
            </li>
            <li>
              <XIcon icon={faX}></XIcon>Caractères spéciaux
            </li>
          </EasyLevelDetails>
          <CardInfo
            onMouseEnter={() => setEasyInfoIsHovered(true)}
            onMouseLeave={() => setEasyInfoIsHovered(false)}
          >
            <CardInfoText>?</CardInfoText>
          </CardInfo>
        </CardContent>
        <CardContent
          $isMediumInfoIsHovered={mediumInfoIsHovered}
          id="medium"
          onClick={handleOnClick}
        >
          <div className="content">
            <CardTitle>Intémediaire </CardTitle>
            <CardImage src={medium} />
            <CardCaption>55% du clavier</CardCaption>
          </div>
          <MediumLevelDetails $isMediumInfoIsHovered={mediumInfoIsHovered}>
          <li>
              <CheckIcon icon={faCheck}></CheckIcon>Minuscules
            </li>
            <li>
              <CheckIcon icon={faCheck}></CheckIcon>Majuscules
            </li>
            <li>
              <CheckIcon icon={faCheck}></CheckIcon>Ponctuations
            </li>
            <li>
              <XIcon icon={faX}></XIcon>Chiffres
            </li>
            <li>
              <XIcon icon={faX}></XIcon>Caractères spéciaux
            </li>
          </MediumLevelDetails>
          <CardInfo
            onMouseEnter={() => setMediumInfoIsHovered(true)}
            onMouseLeave={() => setMediumInfoIsHovered(false)}
          >
            <CardInfoText>?</CardInfoText>
          </CardInfo>
        </CardContent>
        <CardContent
          $isHardInfoIsHovered={hardInfoIsHovered}
          id="hard"
          onClick={handleOnClick}
        >
          <div className="content">
            <CardTitle>Expert </CardTitle>
            <CardImage src={hard} />
            <CardCaption>100% du clavier</CardCaption>
          </div>
          <HardLevelDetails $isHardInfoIsHovered={hardInfoIsHovered}>
          <li>
              <CheckIcon icon={faCheck}></CheckIcon>Minuscules
            </li>
            <li>
              <CheckIcon icon={faCheck}></CheckIcon>Majuscules
            </li>
            <li>
              <CheckIcon icon={faCheck}></CheckIcon>Ponctuations
            </li>
            <li>
              <CheckIcon icon={faCheck}></CheckIcon>Chiffres
            </li>
            <li>
              <CheckIcon icon={faCheck}></CheckIcon>Caractères spéciaux
            </li>
          </HardLevelDetails>
          <CardInfo
            onMouseEnter={() => setHardInfoIsHovered(true)}
            onMouseLeave={() => setHardInfoIsHovered(false)}
          >
            <CardInfoText>?</CardInfoText>
          </CardInfo>
        </CardContent>
      </CardWrapper>
    </CardsContainer>
  );
};

export default CardLevelSelect;
