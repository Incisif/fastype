import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTexts} from './textThunk';

interface TextState {
    text: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TextState = {
    text: '',
    status: 'idle',
    error: null,
};

const textsSlice = createSlice({
    name: 'texts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTexts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTexts.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.text = action.payload;
            })
            .addCase(fetchTexts.rejected, (state, action) => {
                state.status = 'failed';
                if (action.payload) {
                    state.error = action.payload.message;
                } else {
                    state.error = action.error.message ?? 'Une erreur inconnue est survenue';
                }
            });
    },
});
import { RootState } from "../../store/store";

export const selectText = (state: RootState) => state.texts.text;

export default textsSlice.reducer;
