import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './index';
import loginReducer,  {LoginState}  from '../../features/user/userSlice'; // Vérifiez le chemin d'accès
import "@testing-library/jest-dom";


// Définition de l'état global de l'application pour les tests
interface RootState {
  login: LoginState;
}

// Fonction pour créer un store de test
const makeTestStore = (initialState: PreloadedState<RootState>) => configureStore({
  reducer: {
    login: loginReducer,
  },
  preloadedState: initialState,
});

// Fonction utilitaire pour rendre les composants avec Redux et Router
const renderWithProviders = (
  ui: React.ReactElement,
  initialState: PreloadedState<RootState>
) => {
  const store = makeTestStore(initialState);
  return render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );
};

describe("Header Component", () => {
  it("renders without crashing and shows the login button when user is not logged in", () => {
    const initialState = {
      login: {
        user: null,
        rememberMe: false,
        message: null,
      },
    };
    renderWithProviders(<Header />, initialState);
    expect(screen.getByText("Se connecter")).toBeInTheDocument();
  });

  it("displays user information when logged in", () => {
    const loggedInState = {
      login: {
        user: {
          uid: '1',
          email: 'user@example.com',
          firstName: 'John',
          lastName: 'Doe',
          profilePictureUrl: 'https://example.com/profile.jpg',
        },
        rememberMe: true,
        message: null,
      },
    };
    renderWithProviders(<Header />, loggedInState);
    expect(screen.getByText("John")).toBeInTheDocument();
  });

  // Ajoutez ici d'autres tests comme nécessaire pour couvrir les interactions et les changements d'état
});
