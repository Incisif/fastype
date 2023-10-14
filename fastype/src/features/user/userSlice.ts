import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUserThunk } from "./userThunks";

interface LoginState {
  username: string;
  isLoggedIn: boolean;
  message: string | null;
}

const initialState: LoginState = {
  username: "",
  isLoggedIn: false,
  message: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.username = "";
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.message = "Connexion réussie !";
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.message = action.payload ?? "Échec de la connexion"; 
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
