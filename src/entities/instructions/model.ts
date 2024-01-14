import {
  createSelector,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { DocumentPickerAsset } from "expo-document-picker";
import XLSX from 'xlsx';
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
  // TODO Пока что юзКвери не дружит с дата пикером - ошибка большого размера данных. Починить кеширование
  // useQuery(KEY, () => API.instructions.loadExcelFile(), {
  //   onSuccess: (binaryString) => {
  //     if (!binaryString) return
  //     const workbook = XLSX.read(binaryString, { type: 'binary' });
  //     const sheetName = workbook.SheetNames[0];
  //     const worksheet = workbook.Sheets[sheetName];
  //     const dataRow = XLSX.utils.sheet_to_json(worksheet);
  //     console.log('react-query thunk', dataRow)
  //   },
  //   refetchOnWindowFocus: false,
  // });
  {
    const binaryString = await API.instructions.loadExcelFile();
    if (typeof binaryString === 'undefined') return;
    const workbook = XLSX.read(binaryString, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json<Instruction>(worksheet, { header: 1 });
    dispatch(instructionsModel.actions.setInstructionsList(data.slice(0, 25)))
  }


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
        console.log(record)
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