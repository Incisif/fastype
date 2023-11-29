import styled from "styled-components";
interface FeedbackProps {
  accuracy: number;
  wpm: number;
}
const FeedbackContainer = styled.div`
  display: flex;
  justify-content: center;
  color: var(--white-color);
  font-size: 1.2rem;
  width: 100%;
`;
const Message = styled.p`
  width: 60%;
  text-align: center;
  line-height: 1.5;
`;
const Ilustration = styled.img``;

export const Feedback: React.FC<FeedbackProps> = ({ accuracy, wpm }) => {
  let message = "";
 

  if (accuracy >= 98 && wpm < 30) {
    message =
      "Votre précision est excellente ! Essayons maintenant de travailler sur l'augmentation de votre vitesse.";
  } else if (accuracy < 98 && wpm < 30) {
    message =
      "Bon début ! Continuez à pratiquer pour améliorer à la fois votre vitesse et votre précision.";
  } else if (wpm >= 30 && wpm <= 40) {
    message =
      accuracy >= 94
        ? "Bonne précision avec une vitesse modérée. Essayez de pousser un peu plus votre vitesse tout en maintenant cette précision."
        : "Une vitesse modérée prometteuse. Concentrez-vous sur l'amélioration de votre précision.";
  } else if (wpm > 40 && wpm <= 60) {
    message =
      accuracy >= 95
        ? "Bonne vitesse avec une précision solide. Vous êtes sur la bonne voie pour l'excellence."
        : "Vitesse solide ! Essayez d'améliorer votre précision pour une performance complète.";
  } else if (wpm > 60 && wpm <= 70) {
    message =
      accuracy > 95
        ? "Vitesse impressionnante avec une bonne précision. Un petit effort pour perfectionner la précision pourrait être bénéfique."
        : "Très rapide ! Focus sur l'amélioration de la précision pour équilibrer vos compétences.";
  } else if (wpm > 70) {
    message =
      accuracy > 95
        ? "Exceptionnel en termes de vitesse et de précision. Vous êtes un exemple à suivre !"
        : "Vitesse incroyable ! Un peu plus d'attention sur la précision rendra votre performance irréprochable.";
  } else {
    message =
      "Continuez votre pratique régulière et surveillez vos progrès. Chaque effort compte !";
  }

  return (
    <FeedbackContainer>
        <Ilustration></Ilustration>
      <Message>{message}</Message>
    </FeedbackContainer>
  );
};
