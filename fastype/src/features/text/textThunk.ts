import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface FetchError {
  message: string;
}

interface Text {
  difficulty: string;
  content: string;
  language: string;
  title: string;
}

export const fetchTexts = createAsyncThunk<
  string,
  string | null,
  { rejectValue: FetchError }
>("texts/fetch", async (selectedLevel, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      "https://us-central1-text-hub-api.cloudfunctions.net/api/texte/getAllTexts"
    );
    const texts = response.data;

    let filteredTexts = texts;
    if (selectedLevel) {
      filteredTexts = texts.filter(
        (text: Text) => text.difficulty === selectedLevel
      );
    }

    const randomText =
      filteredTexts.length > 0
        ? filteredTexts[Math.floor(Math.random() * filteredTexts.length)]
            .content
        : null;

    return randomText;
  } catch (error) {
    return rejectWithValue({ message: (error as Error).message });
  }
});
