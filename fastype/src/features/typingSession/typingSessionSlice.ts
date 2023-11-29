import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CharStatuses {
  [charIndex: number]: string; 
}

// État initial
const initialState = {
  isExiting: false,
  charStatuses: {} as CharStatuses,
  currentCharPosition: 0,
  isTypingComplete: false,
  translateY: 0,
};

export const typingSessionSlice = createSlice({
  name: "typingSession",
  initialState,
  reducers: {
    setExiting: (state, action: PayloadAction<boolean>) => {
      state.isExiting = action.payload;
    },
    setCharStatus: (state, action: PayloadAction<CharStatuses>) => {
      state.charStatuses = action.payload;
    },
    setCurrentCharPosition: (state, action: PayloadAction<number>) => {
      state.currentCharPosition = action.payload;
    },
    setIsTypingComplete: (state, action: PayloadAction<boolean>) => {
      state.isTypingComplete = action.payload;
    },
    resetSession: (state) => {
      state.charStatuses = {};
      state.currentCharPosition = 0;
      state.isTypingComplete = false;
    },
    setTranslateY: (state, action: PayloadAction<number>) => {
      state.translateY = action.payload;
    }
  },
});

export const { 
  setExiting, 
  resetSession, 
  setCharStatus, 
  setCurrentCharPosition, 
  setIsTypingComplete,
  setTranslateY
} = typingSessionSlice.actions;

export default typingSessionSlice.reducer;
