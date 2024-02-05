import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUserThunk, googleSignInThunk } from "./userThunks";

interface User {
  uid: string | null;
  email: string | null ;
  firstName?: string | null;
  lastName?: string | null;
  profilePictureUrl?: string | null;
  createdAt?: string | null;
  signInMethod?: string | null;
}

export interface LoginState {
  user: User | null;
  rememberMe: boolean;
  message: string | null;
}

const initialState: LoginState = {
  user: JSON.parse(
    localStorage.getItem("user") ?? sessionStorage.getItem("user") ?? "null"
  ),
  message: null,
  rememberMe: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;

    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
    },
    rememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;

        state.message = "Connexion réussie !";
      })
      .addCase(googleSignInThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.message = "Connexion Google réussie !";
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.user = null;

        state.message =
          typeof action.payload === "string"
            ? action.payload
            : "Échec de la connexion";
      })
      .addCase(googleSignInThunk.rejected, (state, action) => {
        state.user = null;

        state.message =
          typeof action.payload === "string"
            ? action.payload
            : "Échec de la connexion Google";
      });
  },
});

export const { setUser, logout, rememberMe, clearMessage } = loginSlice.actions;

export default loginSlice.reducer;
