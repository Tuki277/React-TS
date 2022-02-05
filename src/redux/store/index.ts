import { configureStore } from "@reduxjs/toolkit"
import { todoReducer } from "../feature/todoSlice"

export const store = configureStore({
    reducer: {
        todo: todoReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch