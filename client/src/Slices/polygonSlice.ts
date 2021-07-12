import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PolygonState } from "../interfaces";

export const fetchPolygonById = createAsyncThunk(
    "fetchPolygonById",
    async (id: string) => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASEURL}/polygon/${id}`
        );
        return response.data;
    }
);

export const searchPolygons = createAsyncThunk(
    "searchPolygons",
    async (search: string) => {
        const response = await axios.get(
            `${process.env.REACT_APP_API_BASEURL}/polygon?q=${search}`
        );
        return response.data;
    }
);

const INITIAL_STATE: PolygonState = {
    polygons: [],
    status: "idle",
    error: null,
};

export const polygonSlice = createSlice({
    name: "polygons",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: {
        [fetchPolygonById.pending.toString()]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [fetchPolygonById.fulfilled.toString()]: (state, action) => {
            state.status = "succeeded";
            state.polygons = [action.payload];
        },
        [fetchPolygonById.rejected.toString()]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [searchPolygons.pending.toString()]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [searchPolygons.fulfilled.toString()]: (state, action) => {
            state.status = "succeeded";
            state.polygons = action.payload;
        },
        [searchPolygons.rejected.toString()]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});

export default polygonSlice.reducer;
