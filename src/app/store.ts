import { configureStore } from "@reduxjs/toolkit";
// import { instructionModel } from "entities/instruction";
// import { executorModel } from "entities/executor";

export const store = configureStore({
  reducer: {
    // executor: executorModel.reducer,
    // instruction: instructionModel.reducer,
  },
});