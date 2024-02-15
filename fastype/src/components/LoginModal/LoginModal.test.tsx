/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import createMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import LoginModal from "./index";
import * as userThunks from "../../features/user/userThunks";
import { Store } from "redux";
import "@testing-library/jest-dom";




const middlewares = [thunk];
const mockStore = createMockStore(middlewares);

describe("LoginModal Component", () => {
  let store: Store;

  beforeEach(() => {

    store = mockStore({});


    jest
      .spyOn(userThunks, "loginUserThunk")
      .mockImplementation(
        () => () => Promise.resolve({ type: "user/loginFulfilled" }) as any
      );
    jest
      .spyOn(userThunks, "googleSignInThunk")
      .mockImplementation(
        () => () =>
          Promise.resolve({ type: "user/googleSignInFulfilled" }) as any
      );
    jest
      .spyOn(userThunks, "createUserThunk")
      .mockImplementation(
        () => () => Promise.resolve({ type: "user/createUserFulfilled" }) as any
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("affiche le formulaire de connexion par défaut", () => {
    const mockOnClose = jest.fn();

    render(
      <Provider store={store}>
        <LoginModal onClose={mockOnClose} initialMode="login" />
      </Provider>
    );
    const connectionButton = screen.getByTestId("connection-button");
    expect(connectionButton).toBeInTheDocument();
    expect(connectionButton).toHaveTextContent("Connexion");
  });

  it("change vers le formulaire d'inscription", () => {
    const mockOnClose = jest.fn();

    render(
      <Provider store={store}>
        <LoginModal onClose={mockOnClose} initialMode="login" />
      </Provider>
    );

    fireEvent.click(screen.getByText("Inscris-toi !"));
    const inscriptionButton = screen.getByTestId("inscription-button");

    expect(inscriptionButton).toBeInTheDocument();
    expect(inscriptionButton).toHaveTextContent("Inscris-toi avec Google !");
  });

  //TODO: test the rest of the component
});
