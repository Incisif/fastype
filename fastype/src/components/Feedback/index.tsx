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
  line-height: 1.3;
`;

const Ilustration = styled.img``;

interface Rule {
  wpmRange: [number, number];
  accuracyRange: [number, number];
  message: string;
}

const rules: Rule[] = [
  {
    wpmRange: [0, 29],
    accuracyRange: [98, 100],
    message: "Votre précision est excellente ! Essayons maintenant de travailler sur l'augmentation de votre vitesse."
  },
  {
    wpmRange: [0, 29],
    accuracyRange: [0, 97],
    message: "Bon début ! Continuez à pratiquer pour améliorer à la fois votre vitesse et votre précision."
  },
  {
    wpmRange: [30, 40],
    accuracyRange: [94, 100],
    message: "Bonne précision avec une vitesse modérée. Essayez de pousser un peu plus votre vitesse tout en maintenant cette précision."
  },
  {
    wpmRange: [30, 40],
    accuracyRange: [0, 93],
    message: "Une vitesse modérée prometteuse. Concentrez-vous sur l'amélioration de votre précision."
  },
  {
    wpmRange: [41, 60],
    accuracyRange: [95, 100],
    message: "Bonne vitesse avec une précision solide. Vous êtes sur la bonne voie pour l'excellence."
  },
  {
    wpmRange: [41, 60],
    accuracyRange: [0, 94],
    message: "Vitesse solide ! Essayez d'améliorer votre précision pour une performance complète."
  },
  {
    wpmRange: [61, 70],
    accuracyRange: [95, 100],
    message: "Vitesse impressionnante avec une bonne précision. Un petit effort pour perfectionner la précision pourrait être bénéfique."
  },
  {
    wpmRange: [61, 70],
    accuracyRange: [0, 94],
    message: "Très rapide ! Focus sur l'amélioration de la précision pour équilibrer vos compétences."
  },
  {
    wpmRange: [71, Infinity],
    accuracyRange: [95, 100],
    message: "Exceptionnel en termes de vitesse et de précision. Vous êtes un exemple à suivre !"
  },
  {
    wpmRange: [71, Infinity],
    accuracyRange: [0, 94],
    message: "Vitesse incroyable ! Un peu plus d'attention sur la précision rendra votre performance irréprochable."
  }
];

export const Feedback: React.FC<FeedbackProps> = ({ accuracy, wpm }) => {
  const message = rules.find(rule => 
    wpm >= rule.wpmRange[0] && wpm <= rule.wpmRange[1] &&
    accuracy >= rule.accuracyRange[0] && accuracy <= rule.accuracyRange[1]
  )?.message ?? "Continuez votre pratique régulière et surveillez vos progrès. Chaque effort compte !";

  return (
    <FeedbackContainer>
      <Ilustration></Ilustration>
      <Message>{message}</Message>
    </FeedbackContainer>
  );
};
