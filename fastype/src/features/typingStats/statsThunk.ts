import { createAsyncThunk } from "@reduxjs/toolkit";

interface SessionStats {
  wpm?: number;
  accuracy?: number;
  duration?: number;
  totalKeystrokes?: number;
  errors?: number;
  date?: string;
  level?: string;
  textName?: string;
}
interface UpdateSessionStatsArgs {
  userId: string;
  sessionStats: SessionStats;
}

export const updateSessionStatsThunk = createAsyncThunk(
  "stats/updateSessionStats",
  async (
    { userId, sessionStats }: UpdateSessionStatsArgs,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `https://us-central1-text-hub-api.cloudfunctions.net/api/user/updateSessionStats/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionStats }),
        }
      );
      console.log("sessionStats:", sessionStats);
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorData}`
        );
      }
      console.log("response:", response);
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error:", error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);
