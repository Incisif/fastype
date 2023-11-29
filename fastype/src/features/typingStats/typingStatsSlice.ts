import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TypingStatsState {
  wpm: number;
  cpm: number;
  accuracy: number;
  progressPercentage: number;
  totalChars: number;
  correctChars: number;
  charsTyped: number;
  startTime: number | null;
  endingTime?: number;
  isFirstChar: boolean;
}

const initialState: TypingStatsState = {
  wpm: 0,
  cpm: 0,
  accuracy: 0,
  progressPercentage: 0,
  totalChars: 0,
  correctChars: 0,
  charsTyped: 0,
  startTime: null,
  endingTime: undefined,
  isFirstChar: true,
};

export const TypingStatsSlice = createSlice({
  name: "typingStats",
  initialState,
  reducers: {
    updateWpm: (state, action: PayloadAction<number>) => {
      state.wpm = action.payload;
      console.log("wpm", state.wpm);
    },
    updateCpm: (state, action: PayloadAction<number>) => {
      state.cpm = action.payload;
    },
    updateAccuracy: (state, action: PayloadAction<number>) => {
      state.accuracy = action.payload;
    },
    updateProgressPercentage: (state, action: PayloadAction<number>) => {
      state.progressPercentage = action.payload;
    },
    setTotalChars: (state, action: PayloadAction<number>) => {
        state.totalChars = action.payload;
        console.log("totalChars", state.totalChars);
    },
    updateCorrectChars: (state, action: PayloadAction<number>) => {
        state.correctChars += action.payload;
        console.log("correctChars", state.correctChars);
    },
    updateCharsTyped: (state, action: PayloadAction<number>) => {
      state.charsTyped = action.payload;
      console.log("charsTyped", state.charsTyped);
    },
    setStartTime: (state, action: PayloadAction<number>) => {
        state.startTime = action.payload;
        console.log("startTime", state.startTime);
    },
    setEndingTime: (state, action: PayloadAction<number>) => {
        state.endingTime = action.payload;
        console.log("endingTime", state.endingTime);
    },
    updateTypingStats: (
      state,
      action: PayloadAction<Partial<TypingStatsState>>
    ) => {
      const { wpm, cpm, accuracy, progressPercentage } = action.payload;
      if (wpm !== undefined) state.wpm = wpm;
      if (cpm !== undefined) state.cpm = cpm;
      if (accuracy !== undefined) state.accuracy = accuracy;
      if (progressPercentage !== undefined)
        state.progressPercentage = progressPercentage;
      if (action.payload.totalChars !== undefined)
        state.totalChars = action.payload.totalChars;
      if (action.payload.correctChars !== undefined)
        state.correctChars = action.payload.correctChars;
      if (action.payload.charsTyped !== undefined)
        state.charsTyped = action.payload.charsTyped;
    },
    resetTypingStats: (state) => {
      state.wpm = 0;
      state.cpm = 0;
      state.accuracy = 0;
      state.progressPercentage = 0;
      state.correctChars = 0;
      state.charsTyped = 0;
      state.startTime = null;
      state.endingTime = undefined;
    },
    setIsFirstChar: (state, action: PayloadAction<boolean>) => {
      state.isFirstChar = action.payload;
    }
  },
});

export const {
  updateWpm,
  updateCpm,
  updateAccuracy,
  updateProgressPercentage,
  updateTypingStats,
  setTotalChars,
  updateCorrectChars,
  updateCharsTyped,
  setStartTime,
  setEndingTime,
  resetTypingStats,
  setIsFirstChar
} = TypingStatsSlice.actions;
export default TypingStatsSlice.reducer;
