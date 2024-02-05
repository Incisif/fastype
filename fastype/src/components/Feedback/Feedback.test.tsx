import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Feedback } from "./index"; // Ajustez le chemin d'importation en fonction de votre structure de projet

describe("Feedback Component", () => {
  test.each([
    [
      0,
      100,
      "Votre précision est excellente ! Essayons maintenant de travailler sur l'augmentation de votre vitesse.",
    ],
    [
      28,
      97,
      "Bon début ! Continuez à pratiquer pour améliorer à la fois votre vitesse et votre précision.",
    ],
    [
      30,
      94,
      "Bonne précision avec une vitesse modérée. Essayez de pousser un peu plus votre vitesse tout en maintenant cette précision.",
    ],
    [
      40,
      93,
      "Une vitesse modérée prometteuse. Concentrez-vous sur l'amélioration de votre précision.",
    ],
    [
      41,
      95,
      "Bonne vitesse avec une précision solide. Vous êtes sur la bonne voie pour l'excellence.",
    ],
    [
      60,
      94,
      "Vitesse solide ! Essayez d'améliorer votre précision pour une performance complète.",
    ],
    [
      61,
      95,
      "Vitesse impressionnante avec une bonne précision. Un petit effort pour perfectionner la précision pourrait être bénéfique.",
    ],
    [
      70,
      94,
      "Très rapide ! Focus sur l'amélioration de la précision pour équilibrer vos compétences.",
    ],
    [
      71,
      95,
      "Exceptionnel en termes de vitesse et de précision. Vous êtes un exemple à suivre !",
    ],
    [
      80,
      94,
      "Vitesse incroyable ! Un peu plus d'attention sur la précision rendra votre performance irréprochable.",
    ],
  ])(
    "displays correct message for wpm: %i and accuracy: %i",
    (wpm, accuracy, expectedMessage) => {
      const { getByText } = render(<Feedback wpm={wpm} accuracy={accuracy} />);
      expect(getByText(expectedMessage)).toBeInTheDocument();
    }
  );
});
