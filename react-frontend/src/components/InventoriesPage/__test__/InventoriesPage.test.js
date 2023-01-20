import React from "react";
import { render, screen } from "@testing-library/react";

import InventoriesPage from "../InventoriesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders inventories page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InventoriesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("inventories-datatable")).toBeInTheDocument();
    expect(screen.getByRole("inventories-add-button")).toBeInTheDocument();
});
