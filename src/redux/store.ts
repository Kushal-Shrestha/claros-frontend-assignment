import { configureStore } from "@reduxjs/toolkit";
import drugsReducer from "./drugSlice";
import drugShortageReducer from "./drugShortageSlice";

export const store = configureStore({
  reducer: {
    drugs: drugsReducer,
    drugShortages: drugShortageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
