import React from "react";
// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import Api from "../../services/Api";
// import { ITask, ListResponse } from "../../services/Interface";

// const initialState: TodoSelector = {
//     tasks: []
// }

// export const getAll = createAsyncThunk('todo/getAllTodo', async () => {
//     const res = await Api.get<ListResponse<ITask>>('/api/todo');
//     return res.data
// })

// export const todoSlice = createSlice({
//     name: "todo",
//     initialState,
//     reducers: {},
//     extraReducers: {
//         [getAll.pending.toString()]: (state, action: PayloadAction<ITask>) => {
//             console.log('getdata');
//         }
//     }
// })

// const todoReducer = todoSlice.reducer;

// export default todoReducer;