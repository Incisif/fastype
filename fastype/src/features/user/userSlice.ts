import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUserThunk, googleSignInThunk } from "./userThunks";

interface LoginState {
  username: string |null;
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
    .addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.email;
      state.message = "Connexion réussie !";
    })
    .addCase(loginUserThunk.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.message = typeof action.payload === 'string' ? action.payload : "Échec de la connexion";
    })
    .addCase(googleSignInThunk.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.email;
      state.message = "Connexion Google réussie !";
    })
    .addCase(googleSignInThunk.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.message = typeof action.payload === 'string' ? action.payload : "Échec de la connexion Google";
    });
},

});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
