import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import sessionReducer, {
  setSelectedLevel,
  TypingSessionState,
} from "../../features/typingSession/typingSessionSlice";
import textReducer, { TextState } from "../../features/text/textSlice";

import CardLevelSelect from "./index";

interface RootState {
  session: TypingSessionState;
  texts: TextState;
}

describe("CardLevelSelect Component", () => {
  it("updates state on handleOnClick", () => {
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
        text: "",
        title: "",
        status: "idle",
        error: null,
      },
    };

    // Redux store mock
    const store = configureStore({
      reducer: {
        session: sessionReducer,
        texts: textReducer,
      },
      preloadedState: initialState,
    });

    // Spy on store.dispatch
    const dispatchSpy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <CardLevelSelect />
      </Provider>
    );

    //Click on the easy button
    fireEvent.click(screen.getByTestId("easy"));
    expect(dispatchSpy).toHaveBeenCalledWith(setSelectedLevel("easy"));
    fireEvent.click(screen.getByTestId("medium"));
    expect(dispatchSpy).toHaveBeenCalledWith(setSelectedLevel("medium"));
    fireEvent.click(screen.getByTestId("hard"));
    expect(dispatchSpy).toHaveBeenCalledWith(setSelectedLevel("hard"));
  });


});
