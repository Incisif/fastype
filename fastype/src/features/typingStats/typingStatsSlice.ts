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
};

export const TypingStatsSlice = createSlice({
  name: "typingStats",
  initialState,
  reducers: {
    updateWpm: (state, action: PayloadAction<number>) => {
      state.wpm = action.payload;
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
    setTotalChars: (state, action: PayloadAction<number>) => {
      state.totalChars = action.payload;
    },
    updateCorrectChars: (state, action: PayloadAction<number>) => {
      state.correctChars = action.payload;
    },
    updateCharsTyped: (state, action: PayloadAction<number>) => {
      state.charsTyped = action.payload;
    },
    setStartTime: (state, action: PayloadAction<number>) => {
      state.startTime = action.payload;
    },
    setEndingTime: (state, action: PayloadAction<number>) => {
      state.endingTime = action.payload;
    },
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
} = TypingStatsSlice.actions;
export default TypingStatsSlice.reducer;
