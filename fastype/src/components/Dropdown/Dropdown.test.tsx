import { render, screen } from "@testing-library/react";
import userReducer from "../../features/user/userSlice";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import DropDown from "./index"; 

const initialState = {
  login: {
    user: {
        uid: "1234567890",
        email: "test@mail.com",
        firstName: "John",
        lastName: "Doe",
        profilePictureUrl:null,
        createdAt: null,
        signInMethod: null,
    },
    message: "Connexion réussie !",
    rememberMe: false,
  },
};

const store = configureStore({
  reducer: {
    login: userReducer,
  },
  preloadedState: initialState,
});

describe("DropDown Component", () => {
  test("renders DropDown when isOpen is true", () => {
    const toggleDropdown = jest.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DropDown isOpen={true} toggleDropdown={toggleDropdown} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Entraînement")).toBeInTheDocument();
    expect(screen.getByText("Statistiques")).toBeInTheDocument();
    expect(screen.getByText("Déconnexion")).toBeInTheDocument();
  });

  test("does not render DropDown when isOpen is false", () => {
    const toggleDropdown = jest.fn();
    const { queryByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <DropDown isOpen={false} toggleDropdown={toggleDropdown} />
        </MemoryRouter>
      </Provider>
    );
    expect(queryByText("Entraînement")).not.toBeInTheDocument();
  });

  
});
