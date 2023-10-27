import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../features/global/globalSlice";
import { api } from "../services/api";

const store = configureStore({
    reducer: {
        global: globalReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (gDM) => gDM().concat(api.middleware)
})

export default store;