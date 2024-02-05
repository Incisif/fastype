
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./index"; // Ajustez le chemin d'importation selon votre structure de projet

describe("Footer Component", () => {
  it("renders the footer links and icons", () => {
    render(<Footer />, { wrapper: BrowserRouter });

    // Vérifiez que les liens et les titres sont présents
    expect(screen.getByText("À propos de Fastype")).toBeInTheDocument();
    expect(screen.getByText("Me contacter")).toBeInTheDocument();
    expect(screen.getByText("Portfolio")).toHaveAttribute("href", "https://portfolio.desem.dev/");
    expect(screen.getByText("Github")).toBeInTheDocument();
    expect(screen.getByText("Linkedin")).toBeInTheDocument();
    expect(screen.getByText("Twitter")).toBeInTheDocument();

    // Vérifiez les URLs des liens externes
    expect(screen.getByText("Github").closest("a")).toHaveAttribute("href", "https://github.com/Incisif/fastype");
    expect(screen.getByText("Linkedin").closest("a")).toHaveAttribute("href", "https://www.linkedin.com/in/emmanuel-desmortreux-1223a5257/");
    expect(screen.getByText("Twitter").closest("a")).toHaveAttribute("href", "https://twitter.com/_Emdodj");
  });
});


