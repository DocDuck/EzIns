declare type AppState = ReturnType<typeof import("./store").store.getState>;
declare type AppDispatch = typeof import("./store").store.dispatch;
