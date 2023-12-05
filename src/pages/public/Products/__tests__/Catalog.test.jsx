import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { beforeEach, describe, it, vi } from "vitest";
import Catalog, { productsPerPage } from "../Catalog";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { CartContext } from "../../../../context/CartContext";
import React from "react";

const numberOfProducts = 20;

const getAllProducts = vi.fn(() =>
  // mock getAllProducts from Catalog.jsx
  Promise.resolve(
    new Array(numberOfProducts).fill(null).map((_, index) => ({
      _id: String(index + 1),
      product_name: `Product ${index + 1}`,
      product_description: `Description ${index + 1}`,
    }))
  )
);

// first products text: "Product 1"
describe("Products Component", () => {
  const mockCartItems = [];
  const setMockCartItems = vi.fn();

  beforeEach(() => {
    const testRouter = createMemoryRouter(
      [{ path: "/", element: <Catalog />, loader: getAllProducts }],
      { initialEntries: ["/"] }
    );

    render(
      <ChakraProvider>
        <CartContext.Provider
          value={{ cartItems: mockCartItems, setCartItems: setMockCartItems }}
        >
          <RouterProvider router={testRouter}></RouterProvider>
        </CartContext.Provider>
      </ChakraProvider>
    );
  });

  // query by text: node חייב לקיים את כל הטקסט
  // query by regex: node לא חייב לקיים את כל הטקסט

  it("Displays the correct number of pages for pagination", async () => {
    const displayedProducts = await screen.findAllByText(/\bProduct\b/);
    expect(displayedProducts).toHaveLength(productsPerPage);
  });

  it("Handle search input changed to 1 + Test pagination", async () => {
    const products = await getAllProducts();
    const searchInput = await screen.findByPlaceholderText(
      /Search by name or description/
    );

    const searchValue = "1";

    fireEvent.change(searchInput, { target: { value: searchValue } });

    // חישוב של הכמות סה"כ של המוצרים שבהם יש 1
    const expectedProductCount = products.filter(
      (product) =>
        product.product_name.includes(searchValue) ||
        product.product_description.includes(searchValue)
    ).length;
    const expectedPages = Math.ceil(expectedProductCount / productsPerPage);

    for (let page = 1; page <= expectedPages; page++) {
      await waitFor(async () => {
        const productsNames = await screen.findAllByRole("heading", {
          level: 3,
        });
        const productsDescription = await screen.findAllByTestId(
          "product-description"
        );

        const matchingProducts = productsNames.filter(
          (heading, index) =>
            /1/.test(heading.textContent) ||
            /1/.test(productsDescription[index].textContent)
        );

        const expectedProductCountOnPage =
          page === expectedPages
            ? expectedProductCount % productsPerPage || productsPerPage
            : productsPerPage;

        expect(matchingProducts).toHaveLength(expectedProductCountOnPage);
      });

      if (page === 1) {
        const BackPageButton = screen.queryByText("<<");
        expect(BackPageButton).toBeNull();
      }

      const nextPageButton = screen.queryAllByText(">>")[1];

      if (page < expectedPages) {
        fireEvent.click(nextPageButton);
      } else {
        expect(nextPageButton).toBeUndefined();
      }
    }
  });
});
