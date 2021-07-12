import { configureStore } from "@reduxjs/toolkit";
import polygonReducer from "../Slices/polygonSlice";

export default configureStore({
    reducer: { polygon: polygonReducer },
});
