import {
  createSelector,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { DocumentPickerResult } from 'expo-document-picker';
import { useIsFetching, useQuery } from "react-query";
import type { Instruction } from "shared";
import { API, useAppSelector } from "shared";

const initialState: InstructionState = {
  entries: {},
  queryConfig: {},
};

const KEY = "instructions";

// react-query actions (everything that async)
const getInstructionsTable =  () => async (dispatch: Dispatch) =>
  // useQuery<DocumentPickerResult>(KEY, () => API.instructions.getTable(), {
  //   onSuccess: (data) =>
	// 	console.log('react-query thunk', data),
  //     // dispatch(instructionsModel.actions.setInstructionsList(data.slice(0, 25))),
  //   refetchOnWindowFocus: false,
  // });
	await API.instructions.getTable()

// export const getInstructionByIdAsync = (id: number) => (dispatch: Dispatch) =>
//   useQuery<Instruction>("instructions", () => API.instructions.getInstructionById(id), {
//     onSuccess: (data) => {
//       if (!data.id) {
//         return;
//       }
//       return dispatch(instructionsModel.actions.addInstructionToList(data));
//     },
//     refetchOnWindowFocus: false,
//     retry: false,
//     staleTime: 5 * 60 * 1000, // 5minutes
//   });

// // selectors
// const getFilteredInstructions = () =>
//    (
//     createSelector(
//       (state: AppState) => state.instructionss.queryConfig,
//       (state: AppState) => state.instructionss.entries,
//       (
//         queryConfig: AppState[typeof KEY]["queryConfig"],
//         instructionss: AppState[typeof KEY]["entries"]
//       ) =>
//         Object.values(instructionss).filter(
//           (instructions) =>
//             queryConfig?.completed === undefined ||
//             instructions?.completed === queryConfig.completed
//         )
//     )
//   );

// const useInstruction = (instructionsId: number) =>
//   useAppSelector(
//     createSelector(
//       (state: AppState) => state.instructionss.entries,
//       (instructionss) => instructionss[instructionsId]
//     )
//   );

const areInstructionsLoading = (): boolean => useIsFetching(KEY) > 0;

const instructionsSlice = createSlice({
  name: KEY,
  initialState,
  reducers: {
    setInstructionsList: (state, { payload }: PayloadAction<Instruction[]>) => {
      state.entries = payload.reduce((record, instructions: Instruction) => {
        record[instructions.id] = instructions;
        return record;
      }, {} as Record<number, Instruction>);
    },
    addInstructionToList: (state, { payload: instructions }: PayloadAction<Instruction>) => {
      state.entries[instructions.id] = instructions;
    },
    toggleInstruction: ({ entries }, { payload: instructionsId }: PayloadAction<number>) => {
      entries[instructionsId].completed = !entries[instructionsId].completed;
    },
    setQueryConfig: (state, { payload }: PayloadAction<QueryConfig>) => {
      state.queryConfig = payload;
    },
  },
});

export const instructionsModel = {
  ...instructionsSlice,
  selectors: {
    areInstructionsLoading,
  },
  getInstructionsTable,
};

// TYPES
type InstructionState = {
  entries: Record<number, Instruction>;
  queryConfig: QueryConfig;
};

type QueryConfig = {
  completed?: boolean;
};