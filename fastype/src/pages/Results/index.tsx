import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

import { fetchSessionStatsThunk } from "../../features/typingStats/statsThunk";
import {
  calculateAverage,
  calculateLast7DaysAverage,
  calculateOverallPreviousAverage,
} from "../../utils/calculateTypingStats";
import { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";
import Main from "../../layouts/MainContent";
import styled from "styled-components";
import { WpmGauge } from "../../components/WpmGauge";
import hardLevelIcon from "../../assets/hard_icon- 1.svg";
import mediumLevelIcon from "../../assets/medium_icon- 1.svg";
import easyLevelIcon from "../../assets/easy_icon- 1.svg";
import MyChart from "../../components/MultiMetricTimeChart";

interface SessionStat {
  wpm: number;
  accuracy: number;
  date: string;
  timeInSecond: number;
  level: string;
  textTitle: string;
  last7DaysAverageWPM: number;
  previousAverageWPM: number;
  last7DaysAverageAccuracy: number;
  previous7DaysAverageAccuracy: number;
}

interface Difficulty {
  [key: string]: string;
}

interface StyledHistoryLineProps {
  $isEven: boolean;
}

const Title = styled.h1`
  font-size: 2rem;
  color: var(--grey-color);
  margin-top: 2rem;
  text-align: left;
`;

const AverageSectionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`;
const AverageSection = styled.section`
  position: relative;
  display: flex;
  width: 48%;
  height: 20rem;
  background-color: var(--avevrage-card-background-color);
  color: var(--grey-color);
  border-radius: 10px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 2rem;
`;
const SectionSubTitle = styled.h2`
  font-size: 1.2rem;
  align-self: flex-start;
  margin: 1.2rem;
  color: var(--light-grey-color);
`;
const GlobalAverage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
`;
const Progress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 50%;
  &::before {
    position: absolute;
    content: "";
    width: 1px;
    height: 64%;
    background-color: var(--light-grey-color);
    left: 50%;
    top: 17%;
  }
`;

const AverageSpeed = styled(AverageSection)`
  span {
    font-size: 4rem;
    font-weight: bold;
  }
`;
const GaugeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
`;
const Caption = styled.p`
  position: absolute;
  font-size: 1rem;
  color: var(--light-grey-color);
  bottom: 0.8rem;
`;
const AverageAccuracy = styled(AverageSection)``;

const StyledDialProgress = styled.div`
  display: flex;
  position: absolute;
  height: 100%;
  align-items: center;
  align-self: center;
  font-size: 3.5rem;
`;

const StyledPositiveDialProgress = styled(StyledDialProgress)`
  color: var(--light-green-color);
`;
const StyledNegativeDialProgress = styled(StyledDialProgress)`
  color: var(--negative-progress-color);
`;
const SessionsHistory = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--session-history-background-color);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 2rem;
  width: 60%;
  height: 50rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Rendre le fond de la piste transparent */
  &::-webkit-scrollbar-track {
    background: transparent;
    box-shadow: inset 1px 0 0 0 #f1f1f1;
  }

  /* Styles pour le pouce de la barre de défilement */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    /* Ajouter un décalage intérieur pour le pouce */
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* Styles pour Firefox */
  scrollbar-width: thin;
  scrollbar-color: #888 transparent;
`;
const HistorySectionSubTitle = styled(SectionSubTitle)`
  margin: 1.2rem 1.2rem 1.2rem 0;
`;
const GroupedSessions = styled.div`
  margin-bottom: 2rem;
  color: var(--light-grey-color);
`;
const StyledDate = styled.h3`
  font-size: 1.2rem;
  margin: 1rem 1rem 1rem 0;
  color: var(--grey-color);
`;
const HistoryLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #adadad;
`;
const StyledHistoryLine = styled(HistoryLine)<StyledHistoryLineProps>`
  background-color: ${(props) =>
    props.$isEven ? "var(--styled-history-line-color)" : "none"};
`;

const DifficultyIcon = styled.img`
  width: 20px;
  height: 20px;
  align-self: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  justify-content: space-between;
`;
const ProgressGraphicsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 36%;
  height: 50rem;
  background-color: var(--session-history-background-color);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 2rem;
`;
const GraphicsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;

const Results: React.FC = () => {
  const [averageSpeed, setAverageSpeed] = useState(0);
  const [averageAccuracy, setAverageAccuracy] = useState(0);
  const [accuracyProgress, setAccuracyProgress] = useState(0);
  const [speedProgress, setSpeedProgress] = useState(0);
  const [groupedSessions, setGroupedSessions] = useState<{
    [key: string]: SessionStat[];
  }>({});

  const uid = useSelector((state: RootState) => state.login.user?.uid);
  const dispatch: AppDispatch = useDispatch();

  const difficultyIcons: Difficulty = {
    easy: easyLevelIcon,
    medium: mediumLevelIcon,
    hard: hardLevelIcon,
  };

  const weeklyData = [
    { day: 1, precision: 70, accuracy: 60 },
    { day: 2, precision: 60, accuracy: 78 },
  ];
  const monthlyData = [
    { day: 1, precision: 70, accuracy: 60 },
    { day: 2, precision: 60, accuracy: 78 },
  ];

  function sortedSessionsByDate(sessions: SessionStat[]) {
    return sessions.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // Tri décroissant
    });
  }
  const groupSessionsByDate = useCallback((sessions: SessionStat[]) => {
    // Tri des sessions par date dans un ordre décroissant
    const sortedSessions = sortedSessionsByDate(sessions);

    // Groupement des sessions par date
    return sortedSessions.reduce(
      (acc: { [key: string]: SessionStat[] }, session: SessionStat) => {
        const date = session.date.split("T")[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(session);
        return acc;
      },
      {}
    );
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      if (uid) {
        const action = await dispatch(fetchSessionStatsThunk(uid));
        const sessions = action.payload as SessionStat[];
        const grouped = groupSessionsByDate(sessions);
        setGroupedSessions(grouped);
        const totalWPM = sessions.reduce(
          (acc, session) => acc + session.wpm,
          0
        );
        const averageWPM = calculateAverage(totalWPM, sessions.length);
        const totalAccuracy = sessions.reduce(
          (acc, session) => acc + session.accuracy,
          0
        );
        const averageAccuracy = calculateAverage(
          totalAccuracy,
          sessions.length
        );
        const last7DaysAverageWPM =
          calculateLast7DaysAverage(sessions).averageWpm;
        const previousAverageWPM =
          calculateOverallPreviousAverage(sessions).averageWpm;
        const last7DaysAverageAccuracy =
          calculateLast7DaysAverage(sessions).averageAccuracy;
        const previousAverageAccuracy =
          calculateOverallPreviousAverage(sessions).averageAccuracy;
        const accuracyProgress =
          last7DaysAverageAccuracy - previousAverageAccuracy;
        const speedProgress = last7DaysAverageWPM - previousAverageWPM;
        setAverageSpeed(averageWPM);
        setAverageAccuracy(averageAccuracy);

        setAccuracyProgress(accuracyProgress);
        setSpeedProgress(speedProgress);
      }
    };

    fetchStats();
  }, [uid, dispatch, groupSessionsByDate]);

  // Afficher les sessions groupées
  const renderSessions = () => {
    return Object.entries(groupedSessions).map(([date, sessions]) => (
      <GroupedSessions key={date}>
        <StyledDate>
          {new Date(date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </StyledDate>
        {sessions.map((session, index) => (
          <StyledHistoryLine key={index} $isEven={index % 2 === 0}>
            <div>
              {new Date(session.date).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div> {session.textTitle}</div>
            <div>Précision: {session.accuracy}%</div>
            <div>MPM: {session.wpm}</div>
            <div>Durée: {Math.round(session.timeInSecond / 60)} minutes</div>

            <DifficultyIcon
              src={difficultyIcons[session.level]}
              alt={session.level}
            />
          </StyledHistoryLine>
        ))}
      </GroupedSessions>
    ));
  };
  return (
    <Main>
      <Title>Mes statistiques</Title>
      <AverageSectionsContainer>
        <AverageSpeed>
          <GlobalAverage>
            <SectionSubTitle>Vitesse </SectionSubTitle>
            <GaugeContainer>
              <WpmGauge num={averageSpeed} value="mpm"></WpmGauge>
            </GaugeContainer>
            <Caption>Moyenne générale</Caption>
          </GlobalAverage>
          <Progress>
            <SectionSubTitle>Progression </SectionSubTitle>
            {speedProgress > 0 ? (
              <StyledPositiveDialProgress>
                +{speedProgress}
                <FontAwesomeIcon icon={faArrowTrendUp} />
              </StyledPositiveDialProgress>
            ) : (
              <StyledNegativeDialProgress>
                {speedProgress}
                <FontAwesomeIcon icon={faArrowTrendDown} />
              </StyledNegativeDialProgress>
            )}

            <Caption>7 derniers jours</Caption>
          </Progress>
        </AverageSpeed>
        <AverageAccuracy>
          <GlobalAverage>
            <SectionSubTitle>Précision</SectionSubTitle>
            <GaugeContainer>
              <WpmGauge num={averageAccuracy} value="%"></WpmGauge>
            </GaugeContainer>
            <Caption>Moyenne générale</Caption>
          </GlobalAverage>
          <Progress>
            <SectionSubTitle>Progression </SectionSubTitle>
            {accuracyProgress > 0 ? (
              <StyledPositiveDialProgress>
                +{accuracyProgress}
                <FontAwesomeIcon icon={faArrowTrendUp} />
              </StyledPositiveDialProgress>
            ) : (
              <StyledNegativeDialProgress>
                {accuracyProgress}
                <FontAwesomeIcon icon={faArrowTrendDown} />
              </StyledNegativeDialProgress>
            )}

            <Caption>7 derniers jours</Caption>
          </Progress>
        </AverageAccuracy>
      </AverageSectionsContainer>
      <Container>
        <SessionsHistory>
          <HistorySectionSubTitle>
            Derniers entraînements
          </HistorySectionSubTitle>
          {renderSessions()}
        </SessionsHistory>
        <ProgressGraphicsContainer>
          <SectionSubTitle>Progression</SectionSubTitle>
          <GraphicsWrapper>
            <MyChart interval="week" data={weeklyData} />

            <MyChart interval="month" data={monthlyData} />
          </GraphicsWrapper>
        </ProgressGraphicsContainer>
      </Container>
    </Main>
  );
};

export default Results;
