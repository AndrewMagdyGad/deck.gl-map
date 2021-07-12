import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store";

test("render polygons menu", () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    const selectElement = screen.getAllByLabelText(/Select Polygon/i);
    expect(selectElement).toBeDefined();
});
