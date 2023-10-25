import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface FetchError {
    message: string;
  }

export const fetchTexts = createAsyncThunk<string, void, { rejectValue: FetchError }>(
    'texts/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("https://us-central1-text-hub-api.cloudfunctions.net/api/texte/getAllTexts");
            const texts = response.data;
            const randomText = texts[Math.floor(Math.random() * texts.length)].content;
            return randomText;
        } catch (error) {
            return rejectWithValue({ message: (error as Error).message });
        }
    }
);
