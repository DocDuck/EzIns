import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
declare type AppState = ReturnType<typeof import("../../app/store").store.getState>;
declare type AppDispatch = typeof import("../../app/store").store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;