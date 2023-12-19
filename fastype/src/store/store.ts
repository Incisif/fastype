
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/user/userSlice";
import textReducer from "../features/text/textSlice";
import { useDispatch } from "react-redux";
import statsReducer from "../features/typingStats/typingStatsSlice";
import sessionReducer from "../features/typingSession/typingSessionSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    texts: textReducer,
    stats: statsReducer,
    session: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
