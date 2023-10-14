import { createAsyncThunk } from '@reduxjs/toolkit';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string, password: string }, { rejectWithValue }) => {
    console.log('loginUserThunk called');  // Log 1: Vérifier si le Thunk est appelé
    console.log('Firebase apps:', firebase.apps);  // Log 2: Vérifier les applications Firebase initialisées

    try {
      console.log('About to call signInWithEmailAndPassword');  // Log 3: Avant d'appeler la méthode de connexion
      const userCredential = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
      console.log('signInWithEmailAndPassword called');  // Log 4: Après avoir appelé la méthode de connexion

      const user = userCredential.user;
      if (user) {
        console.log('User found:', user);  // Log 5: Si un utilisateur est trouvé
        return { uid: user.uid, email: user.email };
      } else {
        console.log('No user found');  // Log 6: Si aucun utilisateur n'est trouvé
        return rejectWithValue('No user found');
      }
    } catch (error) {
      console.log('Error caught:', error);  // Log 7: Si une erreur est attrapée
      if (error instanceof Error) { // Notez le changement ici
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);







