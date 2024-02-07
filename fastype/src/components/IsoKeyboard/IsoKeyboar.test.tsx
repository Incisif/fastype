import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import sessionReducer, {
  TypingSessionState,
} from "../../features/typingSession/typingSessionSlice";
import textReducer, { TextState } from "../../features/text/textSlice";
import Keyboard from "./index";

interface RootState {
  session: TypingSessionState;
  texts: TextState;
}
describe("Keyboard Component", () => {
  it("highlights the correct key based on the current character", () => {
    const initialState: RootState = {
      session: {
        isExiting: false,
        charStatuses: {},
        currentCharPosition: 0,
        isTypingComplete: false,
        translateY: 0,
        selectedLevel: null,
      },
      texts: {
        text: "a",
        title: "",
        status: "idle",
        error: null,
      },
    };

    //Store configuration
    const store = configureStore({
      reducer: {
        session: sessionReducer,
        texts: textReducer,
      },
      preloadedState: initialState,
    });

    // Rendu du composant Keyboard avec le Provider Redux enveloppant
    render(
      <Provider store={store}>
        <Keyboard />
      </Provider>
    );

    const highlightedKey = screen.getByTestId("key-a");
    expect(highlightedKey).toHaveAttribute("fill", "#C9C8FF"); 
  });
});
