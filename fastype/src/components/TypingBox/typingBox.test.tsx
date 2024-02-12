import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import TypingBox from "./index";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import createMockStore from "redux-mock-store";

interface CharStatuses {
  [charIndex: number]: string;
}

// Créez un store de test
const middlewares = [thunk];
const mockStore = createMockStore(middlewares);

const getInitialState = (textStatus = "idle", selectedLevel = "easy") => {
  return {
    texts: {
      text: "Texte de test avec des mots et des phrases.",
      title: " Titre de test",
      status: textStatus,
      error: null,
    },
    session: {
      isExiting: false,
      charStatuses: {} as CharStatuses,
      currentCharPosition: 0,
      isTypingComplete: false,
      translateY: 0,
      selectedLevel: selectedLevel,
    },
    stats: {
      wpm: 0,
      cpm: 0,
      accuracy: 0,
      progressPercentage: 0,
      totalChars: 43,
      correctChars: 0,
      charsTyped: 0,
      startTime: null,
      endingTime: undefined,
      isFirstChar: true,
      isLoading: false,
      error: null,
      statsUpdated: false,
    },
    login: {
      user: null,
      rememberMe: false,
      message: null,
    },
  };
};

// Test de rendu initial
describe("TypingBox Component", () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = getInitialState();
    store = mockStore(initialState);
  });

  test("displays loader when text is loading", () => {

    initialState = getInitialState("loading");
    store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <TypingBox />
      </Provider>
    );

    expect(getByTestId("loader")).toBeInTheDocument();
  });


});
