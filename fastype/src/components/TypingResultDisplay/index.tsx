import {
  calculateAccuracy,
  calculateWPM,
  calculateDurationInSeconds,
  calculateDurationInMinutesAndSeconds,
} from "../../features/typingStats/calculateTypingStats";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";

interface DisplayProps {
  totalChars: number;
  correctChars: number;
  startTime: number | null;
  endTime: number | null;
}
interface DialTextType {
  type?: string;
}
const DisplayContainer = styled.div`
  position: absolute;
  z-index: 1;
  background-color: var(--violet-color);
  width: 100%;
  border-radius: 10px;
  height: 100%;
`;
const DialWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4rem auto;
  width: 70%;
  height: 50%;
`;
const DialValue = styled.p`
  font-size: 5rem;
  line-height: 0.9;
`;

const DialUnity = styled.p`
  font-size: 1rem;
`;

const DialText = styled.p<DialTextType>`
  margin-top: 1rem;
  font-size: ${(props) =>
    props.type === "duration" ? "0.8rem" : "1.25rem"};}};
`;

const PrecisionDial = styled.div`
  display: flex;
  flex-direction: column;
  width: 12rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--dark-violet-color);
  display: flex;
  justify-content: center;
  text-align: center;
  color: var(--white-color);
  position: relative;
  &::before {
    z-index: -1;
    position: absolute;
    content: "";
    width: 13rem;
    aspect-ratio: 1;
    background-color: var(--white-color);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const DurationDial = styled.div`
  position: relative;
  width: 6.37rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--dark-violet-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  line-height: 0.4;
  color: var(--white-color);
  &::before {
    z-index: -1;
    position: absolute;
    content: "";
    width: 7rem;
    aspect-ratio: 1;
    background-color: var(--timing-stroke-color);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const SpeedDial = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 12rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--dark-violet-color);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--white-color);
  font-size: 6rem;
  &::before {
    z-index: -1;
    position: absolute;
    content: "";
    width: 13rem;
    aspect-ratio: 1;
    background-image: conic-gradient(green, yellow, orange, red);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const GraduationsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BaseGraduation = styled.div`
  position: absolute;
  z-index: 99;
  background-color: var(--white-color);
  left: 50%;
  bottom: 100%;
`;

const SmallGraduation = styled(BaseGraduation)`
  width: 0.1rem; /* Épaisseur des petits traits */
  height: 0.7rem; /* Longueur des petits traits */
  transform-origin: 50% calc(6rem + 0.7rem);
  &:nth-child(2) {
    transform: translateX(-50%) rotate(45deg);
  }
  &:nth-child(4) {
    transform: translateX(-50%) rotate(135deg);
  }
  &:nth-child(6) {
    transform: translateX(-50%) rotate(225deg);
  }
  &:nth-child(8) {
    transform: translateX(-50%) rotate(315deg);
  }
`;

const BigGraduation = styled(BaseGraduation)`
  width: 0.2rem; /* Épaisseur des grands traits */
  height: 1rem; /* Longueur des grands traits */
  transform-origin: 50% calc(6rem + 1rem);
  &:nth-child(1) {
    transform: translateX(-50%) rotate(0deg);
  }

  &:nth-child(3) {
    transform: translateX(-50%) rotate(90deg);
  }

  &:nth-child(5) {
    transform: translateX(-50%) rotate(180deg);
  }

  &:nth-child(7) {
    transform: translateX(-50%) rotate(270deg);
  }
`;
const StyledButton = styled.button`
  position: absolute;
  bottom: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 2.37rem;
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
`;
const RetryButton = styled(StyledButton)`
  left: 2.5rem;
  background-color: var(--white-color);
  color: var(--grey-color);
`;
const NextButton = styled(StyledButton)`
  right: 2.5rem;
  background-color: var(--Next-button-color);
  color: var(--white-color);
`;

const TypingResultDisplay: React.FC<DisplayProps> = ({
  totalChars,
  correctChars,
  startTime,
  endTime,
}) => {
  const accuracy = calculateAccuracy(totalChars, correctChars);
  const durationInSeconds = calculateDurationInSeconds(startTime, endTime);
  const durationInMinutesAndSeconds = calculateDurationInMinutesAndSeconds(
    startTime,
    endTime
  );
  const wpm = calculateWPM(totalChars, durationInSeconds);

  return (
    <DisplayContainer>
      <DialWrapper>
        <PrecisionDial>
          <DialValue>{accuracy}</DialValue>
          <DialUnity>%</DialUnity>
          <DialText>précision</DialText>
        </PrecisionDial>
        <DurationDial>
          {durationInMinutesAndSeconds}
          <DialText type="duration">min : sec</DialText>{" "}
        </DurationDial>
        <SpeedDial>
          <GraduationsContainer>
            <BigGraduation></BigGraduation>
            <SmallGraduation></SmallGraduation>
            <BigGraduation></BigGraduation>
            <SmallGraduation></SmallGraduation>
            <BigGraduation></BigGraduation>
            <SmallGraduation></SmallGraduation>
            <BigGraduation></BigGraduation>
            <SmallGraduation></SmallGraduation>
          </GraduationsContainer>
          <DialValue>{wpm}</DialValue>
          <DialUnity>wpm</DialUnity>
          <DialText>vitesse</DialText>
        </SpeedDial>
      </DialWrapper>
      <RetryButton>
        <FontAwesomeIcon icon="redo" />
      </RetryButton>
      <NextButton>
        <FontAwesomeIcon icon={faForward} />
      </NextButton>
    </DisplayContainer>
  );
};

export default TypingResultDisplay;
