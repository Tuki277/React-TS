import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Api from "../../services/Api";
import { IImage, IImageRedux, IImagesPost, ListResponse } from "../../services/Interface";

const initialState: IImageRedux = {
    listImage: null,
    message: ""
}

export const getAllImages = createAsyncThunk('Image/getall', async () => {
    const res = await Api.get<ListResponse<IImage>>('/api/images')
    return res.data
})

export const addImage = createAsyncThunk('Image/addImage', async (item: IImagesPost) => {
    const res = await Api.post('/api/images/upload', item)
    return res.data
})

const imageSlice = createSlice({
    name: "Image",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllImages.fulfilled, (state, action: PayloadAction<ListResponse<IImage>>) => {
            state.listImage = action.payload
        })
        builder.addCase(addImage.fulfilled, (state, action: PayloadAction<IImagesPost>) => {})
    }
})

export const imageReducer = imageSlice.reducer