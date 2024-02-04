import styled, { css } from "styled-components";
import easy from "../../assets/easy_icon.webp";
import medium from "../../assets/medium_icon.webp";
import hard from "../../assets/hard_icon.webp";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../store/store";
import { setSelectedLevel } from "../../features/typingSession/typingSessionSlice";
import { fetchTexts } from "../../features/text/textThunk";
import { device } from "../../styles/breakpoints";

interface CardContentProps {
  $isEasyInfoIsHovered?: boolean;
  $isMediumInfoIsHovered?: boolean;
  $isHardInfoIsHovered?: boolean;
  $backgroundColor?: string;
}

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
 
`;
const CardWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3vw;
  width: 100%;
  height: 70%;
  flex-shrink: 0;
  @media ${device.md} {
    gap: 2vw;
  }
  @media ${device.sm} {
    flex-direction: column;
  }
`;

const CardContent = styled.div<CardContentProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 100%;
  background-color: var(--white-color);
  border-radius: 10px;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;

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
  background-color: ${(props) => props.$backgroundColor};
  @media ${device.md} {
    width: 30%;
  }
  @media ${device.sm} {
    width: 80%;
  }
`;
const CardTitle = styled.h3`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  color: white;
  font-size: 1.3rem;
  font-weight: 500;
  @media ${device.sm} {
    top: 35%;
    font-size: 1.5rem;
  }
`;
const CardImage = styled.img`
  width: 100%;
  object-fit: contain;
  transform: translateY(10%);
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
  @media ${device.md} {
    display: none;
  }
`;
const CardInfoIcon = styled.p`
  position: absolute;
  bottom: 0.5rem;
  right: 0.7rem;
  font-size: 1rem;
  color: var(--white-color);
 
`;
const LevelDetails = styled.ul<CardContentProps>`
  position: absolute;
  left: -100%;
  top: 5%;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
  li {
    margin: 0.5rem 0 0 1rem;
  }
  @media ${device.md} {
    display: none;
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

const CardLevelSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const [easyInfoIsHovered, setEasyInfoIsHovered] = useState(false);
  const [mediumInfoIsHovered, setMediumInfoIsHovered] = useState(false);
  const [hardInfoIsHovered, setHardInfoIsHovered] = useState(false);

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const selectedLevel = e.currentTarget.id;
    dispatch(setSelectedLevel(selectedLevel));
    localStorage.setItem("selectedLevel", selectedLevel);
    dispatch(fetchTexts(selectedLevel));
  };

  return (
    <CardsContainer>
      <CardWrapper>
        <CardContent
          $isEasyInfoIsHovered={easyInfoIsHovered}
          id="easy"
          onClick={handleOnClick}
          $backgroundColor="#049eff"
        >
          <CardTitle>Débutant</CardTitle>
          <div className="content">
            <CardImage src={easy} alt="easy mode selector" />
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
            <CardInfoIcon>?</CardInfoIcon>
          </CardInfo>
        </CardContent>
        <CardContent
          $isMediumInfoIsHovered={mediumInfoIsHovered}
          id="medium"
          onClick={handleOnClick}
          $backgroundColor="#ffa600"
        >
          <CardTitle>Intémediaire </CardTitle>
          <div className="content">
            <CardImage src={medium} alt="medium mode selector" />
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
            <CardInfoIcon>?</CardInfoIcon>
          </CardInfo>
        </CardContent>
        <CardContent
          $isHardInfoIsHovered={hardInfoIsHovered}
          id="hard"
          onClick={handleOnClick}
          $backgroundColor="#dd1449"
        >
          <CardTitle>Expert </CardTitle>
          <div className="content">
            <CardImage src={hard} alt="hard mode selector" />
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
            <CardInfoIcon>?</CardInfoIcon>
          </CardInfo>
        </CardContent>
      </CardWrapper>
    </CardsContainer>
  );
};

export default CardLevelSelect;
