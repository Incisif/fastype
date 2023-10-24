import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);

      const user = userCredential.user;
      if (user) {
        return { uid: user.uid, email: user.email };
      } else {
        return rejectWithValue("No user found");
      }
    } catch (error) {
      if (error instanceof Error) {
        // Notez le changement ici
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
