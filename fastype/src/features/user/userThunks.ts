import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { logout } from "./userSlice";

export const createUserThunk = createAsyncThunk(
  "auth/createUser",
  async (
    credentials: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
    { rejectWithValue }
  ) => {
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.firstName ||
      !credentials.lastName
    ) {
      return rejectWithValue("All fields are required.");
    }

    try {
      const userDetails = {
        email: credentials.email,
        password: credentials.password,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        createdAt: new Date().toISOString(),
        signInMethod: "standard",
      };

      const response = await fetch(
        `https://us-central1-text-hub-api.cloudfunctions.net/api/user/createUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorData}`
        );
      }

      return userDetails;
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error:", error.message);
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as RootState;
    const { rememberMe } = state.login;

    try {
      const persistence = rememberMe
        ? firebase.auth.Auth.Persistence.LOCAL
        : firebase.auth.Auth.Persistence.SESSION;

      await firebase.auth().setPersistence(persistence);
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);

      const user = userCredential.user;
      if (user) {
        const userDetails = {
          uid: user.uid,
          email: user.email,
          firstName: user.displayName?.split(" ")[0],
          lastName: user.displayName?.split(" ")[1],
          profilePictureUrl: user.photoURL,
          createdAt: user.metadata.creationTime,
          signInMethod: "standard",
        };

        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(userDetails));
        } else {
          sessionStorage.setItem("user", JSON.stringify(userDetails));
        }

        return userDetails;
      } else {
        return rejectWithValue("No user found");
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await firebase.auth().signOut();

      // Ici, déclencher l'action 'logout' pour réinitialiser l'état Redux
      dispatch(logout());

      return null;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);


export const googleSignInThunk = createAsyncThunk(
  "auth/googleSignIn",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const { rememberMe } = state.login;

    try {
      const persistence = rememberMe
        ? firebase.auth.Auth.Persistence.LOCAL
        : firebase.auth.Auth.Persistence.SESSION;

      await firebase.auth().setPersistence(persistence);
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      const user = result.user;

      if (user) {
        //Check if user exists
        const responseCheck = await fetch(
          `https://us-central1-text-hub-api.cloudfunctions.net/api/user/userExists/${user.email}`,
          {
            method: "GET",
          }
        );

        let userDetails;

        if (responseCheck.ok) {
          // if user exists, get user details
          userDetails = await responseCheck.json();
        } else {
          // If user doesn't exist, create user
          userDetails = {
            uid: user.uid,
            email: user.email,
            firstName: user.displayName?.split(" ")[0],
            lastName: user.displayName?.split(" ")[1],
            profilePictureUrl: user.photoURL,
            createdAt: new Date().toISOString(),
            signInMethod: "google",
          };

          const response = await fetch(
            `https://us-central1-text-hub-api.cloudfunctions.net/api/user/createUser`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userDetails),
            }
          );

          if (!response.ok) {
            const errorData = await response.text();
            throw new Error(
              `HTTP error! status: ${response.status}, message: ${errorData}`
            );
          }
        }

        // Store user details in local/session storage
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(userDetails));
        } else {
          sessionStorage.setItem("user", JSON.stringify(userDetails));
        }

        return userDetails;
      } else {
        return rejectWithValue("No user found");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error:", error.message);
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
