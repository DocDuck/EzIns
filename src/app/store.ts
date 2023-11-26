import { configureStore } from "@reduxjs/toolkit";
import { instructionsModel } from "entities/instructions";
// import { executorModel } from "entities/executor";

export const store = configureStore({
  reducer: {
    // executor: executorModel.reducer,
    instruction: instructionsModel.reducer,
  },
});