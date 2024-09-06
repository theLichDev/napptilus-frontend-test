import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OompaLoompa } from '../types';
import { oompaLoompaApi } from '../services/oompaLoompa';

const oompaLoompasSlice = createSlice({
  name: 'oompaLoompas',
  initialState: { list: [] as OompaLoompa[], lastPageFetched: 1 },
  reducers: {
    setOompaLoompas: (state, action: PayloadAction<OompaLoompa[]>) => {
      state.list = action.payload;
    },
    setLastPageFetched: (state, action: PayloadAction<number>) => {
      state.lastPageFetched = action.payload;
    },
  },
});

export const { setOompaLoompas, setLastPageFetched } = oompaLoompasSlice.actions;

export const store = configureStore({
  reducer: {
    oompaLoompas: oompaLoompasSlice.reducer,
    [oompaLoompaApi.reducerPath]: oompaLoompaApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(oompaLoompaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
