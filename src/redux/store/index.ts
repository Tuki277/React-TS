import { configureStore } from "@reduxjs/toolkit"
import { imageReducer } from "../feature/imageSlice"
import { todoReducer } from "../feature/todoSlice"

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        image: imageReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch