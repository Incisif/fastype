import {
  calculateAccuracy,
  calculateWPM,
  calculateDurationInSeconds,
  calculateDurationInMinutesAndSeconds,
} from "../../features/typingStats/calculateTypingStats";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Feedback } from "../Feedback/insex";

interface DisplayProps {
  totalChars: number;
  correctChars: number;
  startTime: number | null;
  endTime: number | null;
}
interface DialTextType {
  type?: string;
}

const slideIn = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  35% {
    opacity: 1;
  }
  70% {
    transform: translateY(0%);
  }
  78% {  // Approximativement 0.19 seconde après 70%
    transform: translateY(-5%);  // Premier rebond à 5%
  }
  83% {  // Environ 0.13 seconde après 78%
    transform: translateY(0%);
  }
  89% {  // Second rebond, plus court
    transform: translateY(-2.50%); // Deuxième rebond à 2.5%
  }
  100% {
    transform: translateY(0);  // Retour à la position finale
  }
`;

const DisplayContainer = styled.div`
  position: absolute;
  z-index: 1;
  background-color: var(--dark-violet-color);
  width: 100%;
  border-radius: 10px;
  height: 100%;
  animation: ${slideIn} 1s cubic-bezier(1,.36,.85,.8);
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  width: 6.37rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--dark-violet-color);
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
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--white-color);
  width: 12rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--dark-violet-color);
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
  &:hover {
    border: 1px solid #5f3693;
    transform: translateY(-2px);
    box-shadow: 0 3px 0 #5f3693;
  }
  &:active {
    transform: translateY(0px);
    box-shadow: 0 0px 0 #5f3693;
  }
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
  const [wpmAnimated, setWpmAnimated] = useState(0);
  const [accuracyAnimated, setAccuracyAnimated] = useState(0);

  useEffect(() => {
    const wpmInterval = setInterval(() => {
      setWpmAnimated((prevWpm) => {
        if (prevWpm < wpm) {
          return prevWpm + 1;
        } else {
          clearInterval(wpmInterval);
          return prevWpm;
        }
      });
    }, 10);

    const accuracyInterval = setInterval(() => {
      setAccuracyAnimated((prevAccuracy) => {
        if (prevAccuracy < accuracy) {
          return prevAccuracy + 1;
        } else {
          clearInterval(accuracyInterval);
          return prevAccuracy;
        }
      });
    }, 10);

    return () => {
      clearInterval(wpmInterval);
      clearInterval(accuracyInterval);
    };
  }, [accuracy, wpm]);

  return (
    <DisplayContainer>
      <DialWrapper>
        <PrecisionDial>
          <DialValue>{accuracyAnimated}</DialValue>
          <DialUnity>%</DialUnity>
          <DialText>précision</DialText>
        </PrecisionDial>
        <DurationDial>
          {durationInMinutesAndSeconds}
          <DialText type="duration">min : sec</DialText>{" "}
        </DurationDial>
        <SpeedDial>
          <DialValue>{wpmAnimated}</DialValue>
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
      <Feedback accuracy={accuracy} wpm={wpm}></Feedback>
    </DisplayContainer>
  );
};

export default TypingResultDisplay;
