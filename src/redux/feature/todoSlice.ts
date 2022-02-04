import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Api from "../../services/Api";
import { DetailResponse, ITask, ITaskPost, ITaskRedux, ListResponse } from "../../services/Interface";

const initialState: ITaskRedux = {
    task: undefined,
    loading: false,
    message: ""
}

export const getAllTodo = createAsyncThunk('Todo/getall', async () => {
    const res = await Api.get<ListResponse<ITask>>('/api/todo');
    return res.data
})

export const addTodo = createAsyncThunk('Todo/addTodo', async (item: ITaskPost) => {
    const res = await Api.post<DetailResponse<ITaskPost>>('/api/todo', item)
    return res.data
})

const todoSlice = createSlice({
    name: 'Todo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllTodo.fulfilled, (state, action: PayloadAction<ListResponse<ITask>>) => {
            state.task = action.payload
        })
        builder.addCase(addTodo.fulfilled, (state, action: PayloadAction<DetailResponse<ITaskPost>>) => {})
    }
})

export const todoReducer = todoSlice.reducer