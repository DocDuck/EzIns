import {
  createSelector,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import XLSX from 'xlsx';
// import { useIsFetching, useQuery } from "react-query";
import { API, useAppSelector } from "shared";
import { Instruction } from "shared/types/instruction";

const initialState: InstructionState = {
  isLoaded: false,
  entries: {},
  queryConfig: {},
};

const KEY = "instructions";

// react-query actions (everything that async)
const getInstructionsTableThunk =  () => async (dispatch: Dispatch) =>
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
    dispatch(instructionsModel.actions.setInstructionsList(data.slice(0, 25)));
    dispatch(instructionsModel.actions.setIsLoaded(true));
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

// selectors
const getInstructions = () => (state: AppState) => state.instruction.entries;
const getIsLoaded = () => (state: AppState): boolean => state.instruction.isLoaded;

// const useInstruction = (instructionsId: number) =>
//   useAppSelector(
//     createSelector(
//       (state: AppState) => state.instructionss.entries,
//       (instructionss) => instructionss[instructionsId]
//     )
//   );


const instructionsSlice = createSlice({
  name: KEY,
  initialState,
  reducers: {
    setIsLoaded: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoaded = payload
    },
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
    // toggleInstruction: ({ entries }, { payload: instructionsId }: PayloadAction<number>) => {
    //   entries[instructionsId].completed = !entries[instructionsId].completed;
    // },
    setQueryConfig: (state, { payload }: PayloadAction<QueryConfig>) => {
      state.queryConfig = payload;
    },
  },
});

export const instructionsModel = {
  ...instructionsSlice,
  selectors: {
    getIsLoaded,
    getInstructions
  },
  getInstructionsTableThunk,
};

// TYPES
type InstructionState = {
  isLoaded: boolean,
  entries: Record<number, Instruction>;
  queryConfig: QueryConfig;
};

type QueryConfig = {
  completed?: boolean;
};