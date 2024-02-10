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

interface KeyTest {
  char: string;
  testId: string;
  color: string;
}

const keyTests: KeyTest[] = [
  { char: "a", testId: "key-a", color: "#C9C8FF" },
  { char: "b", testId: "key-b", color: "#99E9E5" },
  { char: "c", testId: "key-c", color: "#FFBDCA" },
  { char: "d", testId: "key-d", color: "#FFBDCA" },
  { char: "e", testId: "key-e", color: "#FFBDCA" },
  { char: "f", testId: "key-f", color: "#99E9E5" },
  { char: "g", testId: "key-g", color: "#99E9E5" },
  { char: "h", testId: "key-h", color: "#FFEB99" },
  { char: "i", testId: "key-i", color: "#FFBDCA" },
  { char: "j", testId: "key-j", color: "#FFEB99" },
  { char: "k", testId: "key-k", color: "#FFBDCA" },
  { char: "l", testId: "key-l", color: "#FFD599" },
  { char: "m", testId: "key-m", color: "#ACF3C7" },
  { char: "n", testId: "key-n", color: "#FFEB99" },
  { char: "o", testId: "key-o", color: "#FFD599" },
  { char: "p", testId: "key-p", color: "#ACF3C7" },
  { char: "q", testId: "key-q", color: "#C9C8FF" },
  { char: "r", testId: "key-r", color: "#99E9E5" },
  { char: "s", testId: "key-s", color: "#ACF3C7" },
  { char: "t", testId: "key-t", color: "#99E9E5" },
  { char: "u", testId: "key-u", color: "#FFEB99" },
  { char: "v", testId: "key-v", color: "#99E9E5" },
  { char: "w", testId: "key-w", color: "#C9C8FF" },
  { char: "x", testId: "key-x", color: "#ACF3C7" },
  { char: "y", testId: "key-y", color: "#FFEB99" },
  { char: "z", testId: "key-z", color: "#ACF3C7" },
  { char: " ", testId: "key-space", color: "#57D6FE" },
];

describe("Keyboard Component", () => {
  keyTests.forEach(({ char, testId, color }) => {
    it(`highlights the '${char}' key correctly`, () => {
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
          text: char,
          title: "",
          status: "idle",
          error: null,
        },
      };

      const store = configureStore({
        reducer: {
          session: sessionReducer,
          texts: textReducer,
        },
        preloadedState: initialState,
      });

      render(
        <Provider store={store}>
          <Keyboard />
        </Provider>
      );

      const highlightedKey = screen.getByTestId(testId);
      expect(highlightedKey).toHaveAttribute("fill", color);
    });
  });
});
