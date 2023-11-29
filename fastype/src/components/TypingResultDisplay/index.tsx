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
import { useAppDispatch, RootState } from "../../store/store";
import { Feedback } from "../Feedback";
import ThreeDButton from "../ThreeDButton";
import {
  resetSession,
  setExiting,
  setTranslateY,
} from "../../features/typingSession/typingSessionSlice";
import { resetTypingStats, setIsFirstChar } from "../../features/typingStats/typingStatsSlice";
import { useSelector } from "react-redux";
import { fetchTexts } from "../../features/text/textThunk";

interface DisplayProps {
  totalChars: number;
  correctChars: number;
  startTime: number | null;
  endTime: number | null;
  typingBoxRef: React.RefObject<HTMLDivElement>;
}
interface DialTextType {
  type?: string;
}
interface DialProps {
  $isExiting: boolean;
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
  78% { 
    transform: translateY(-5%);
  }
  83% { 
    transform: translateY(0%);
  }
  89% { 
    transform: translateY(-2.50%);
  }
  100% {
    transform: translateY(0);  
`;

const slideOut = keyframes`
  0% {
    transform: translateY(0%);
    opacity: 1;
  }
  100% {
    transform: translateY(-100%); 
    opacity: 0; 
`;

const DisplayContainer = styled.div<DialProps>`
  position: absolute;
  z-index: 1;
  background-color: var(--dark-violet-color);
  width: 100%;
  border-radius: 10px;
  height: 100%;
  animation: ${(props) => (props.$isExiting ? slideOut : slideIn)} 1s ${(
  props
) =>
  props.$isExiting ? slideOutTimingFunction : slideInTimingFunction} forwards;};
`;
const DialWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2.4rem auto 1.6rem auto;
  width: 60%;
  height: 50%;
`;
const DialValue = styled.p`
  font-size: 3rem;
  line-height: 1;
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
  width: 10rem;
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
    width: 10.8rem;
    aspect-ratio: 1;
    background-color: var(--accuracy-stroke-color);
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
  font-size: 1.8rem;
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
  width: 10rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--dark-violet-color);
  font-size: 6rem;
  &::before {
    z-index: -1;
    position: absolute;
    content: "";
    width: 10.8rem;
    aspect-ratio: 1;
    background-color: var(--spedd-stroke-color);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 4rem;
`;
const RetryButton = styled(ThreeDButton)``;
const NextButton = styled(ThreeDButton)``;
const slideInTimingFunction = "cubic-bezier(1, 0.36, 0.85, 0.8)";
const slideOutTimingFunction = "cubic-bezier(0.6, 0.04, 0.98, 0.34)";

const TypingResultDisplay: React.FC<DisplayProps> = ({
  totalChars,
  correctChars,
  startTime,
  endTime,
  typingBoxRef,
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
  const $isExiting = useSelector((state: RootState) => state.session.isExiting);
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(setExiting(true));
    setTimeout(() => {
      dispatch(resetSession());
      dispatch(resetTypingStats());
      dispatch(setTranslateY(0));
      dispatch(setExiting(false));
      dispatch(setIsFirstChar(true));
      typingBoxRef.current?.focus();
    }, 1000); // délai de 1 seconde
  };

  const handleNext = () => {
    dispatch(setExiting(true));
    setTimeout(() => {
      dispatch(resetSession());
      dispatch(resetTypingStats());
      dispatch(setTranslateY(0));
      dispatch(fetchTexts());
      dispatch(setExiting(false));
      dispatch(setIsFirstChar(true));
      typingBoxRef.current?.focus();
    }, 1000); // délai de 1 seconde
  };

  useEffect(() => {
    // Délai avant de commencer l'animation
    const animationDelay = 1000;

    const startAnimation = () => {
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
    };

    const animationTimer = setTimeout(startAnimation, animationDelay);

    return () => {
      clearInterval(animationTimer);
    };
  }, [accuracy, wpm]);

  return (
    <DisplayContainer $isExiting={$isExiting}>
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
      <BottomWrapper>
        <RetryButton
          $backgroundColor={"var(--Retry-button-color)"}
          color={"var(--white-color)"}
          $shadowColor={"var(--white-color)"}
          fontSize={"1.8rem"}
          onClick={handleReset}
        >
          <FontAwesomeIcon icon="redo" />
        </RetryButton>
        <Feedback accuracy={accuracy} wpm={wpm}></Feedback>
        <NextButton
          $backgroundColor={"var(--Next-button-color)"}
          color={"var(--white-color)"}
          $shadowColor={"var(--white-color)"}
          fontSize={"1.8rem"}
          onClick={handleNext}
        >
          <FontAwesomeIcon icon={faForward} />
        </NextButton>
      </BottomWrapper>
    </DisplayContainer>
  );
};

export default TypingResultDisplay;
