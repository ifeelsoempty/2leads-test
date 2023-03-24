import { configureStore } from "@reduxjs/toolkit";

import { userTableSlice } from "./slices/userTable/userTable";

export const store = configureStore({
  reducer: {
    userTable: userTableSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
