// LoginStateMessage.test.tsx
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../features/user/userSlice";
import LoginStateMessage from "../../components/LoginStateMessage";
import "@testing-library/jest-dom";

const initialState = {
  login: {
    user: null,
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

describe("LoginStateMessage Component", () => {
  test("displays the login message from state", () => {
    render(
      <Provider store={store}>
        <LoginStateMessage />
      </Provider>
    );

    expect(screen.getByText("Connexion réussie !")).toBeInTheDocument();
  });
});
