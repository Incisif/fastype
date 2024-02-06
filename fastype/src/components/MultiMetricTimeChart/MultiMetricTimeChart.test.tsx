import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import MultiMetricTimeChart from "./index";
describe("MyChart Component", () => {
  it("renders correctly for a week interval", () => {
    const data = [
      { day: 1, wpm: 20, accuracy: 90 },
      { day: 2, wpm: 25, accuracy: 95 },
    ];
    const { getByText } = render(
      <MultiMetricTimeChart data={data} interval="week" />
    );

    expect(getByText("7 derniers jours")).toBeInTheDocument();
  });

  it("renders correctly for a month interval", () => {
    const data = [
      { day: 1, wpm: 20, accuracy: 90 },
      { day: 2, wpm: 25, accuracy: 95 },
    ];
    const { getByText } = render(
      <MultiMetricTimeChart data={data} interval="month" />
    );

    // Vérifiez que le composant affiche le bon texte d'intervalle
    expect(getByText("30 derniers jours")).toBeInTheDocument();
  });
});
