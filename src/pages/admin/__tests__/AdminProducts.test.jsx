import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { beforeEach, describe, it, vi } from "vitest";
import AdminProducts from "../AdminProducts";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { CartContext } from "../../../context/CartContext";

const numberOfProducts = 20;

const getAllProducts = vi.fn(() =>
  // mock getAllProducts from App.jsx
  Promise.resolve(
    new Array(numberOfProducts).fill(null).map((_, index) => ({
      _id: String(index + 1),
      product_name: `Product ${index + 1}`,
      product_description: `Description ${index + 1}`,
      product_image: `Image ${index + 1}`,
      categories: [{ category: { category_name: `Category ${index + 1}` } }],
    }))
  )
);

// first products text: "Product 1"
describe("Admin Products Component", () => {
  const mockCartItems = [];
  const setMockCartItems = vi.fn();

  beforeEach(() => {
    const testRouter = createMemoryRouter(
      [{ path: "/", element: <AdminProducts />, loader: getAllProducts }],
      { initialEntries: ["/"] }
    );

    render(
      <ChakraProvider>
        <RouterProvider router={testRouter}></RouterProvider>
      </ChakraProvider>
    );
  });

  it("Displays products", async () => {
    const displayedProducts = await screen.findAllByTestId("product-row");
    expect(displayedProducts).toBeDefined();
  });

  //   it("Handle search input changed to 1 + Test pagination", async () => {
  //     const products = await getAllProducts();
  //     const searchInput = await screen.findByPlaceholderText(
  //       /Search by name or description/
  //     );

  //     const searchValue = "1";

  //     fireEvent.change(searchInput, { target: { value: searchValue } });

  //     // חישוב של הכמות סה"כ של המוצרים שבהם יש 1
  //     const expectedProductCount = products.filter(
  //       (product) =>
  //         product.product_name.includes(searchValue) ||
  //         product.product_description.includes(searchValue)
  //     ).length;
  //     const expectedPages = Math.ceil(expectedProductCount / productsPerPage);

  //     for (let page = 1; page <= expectedPages; page++) {
  //       await waitFor(async () => {
  //         const productsNames = await screen.findAllByRole("heading", {
  //           level: 3,
  //         });
  //         const productsDescription = await screen.findAllByTestId(
  //           "product-description"
  //         );

  //         const matchingProducts = productsNames.filter(
  //           (heading, index) =>
  //             /1/.test(heading.textContent) ||
  //             /1/.test(productsDescription[index].textContent)
  //         );

  //         const expectedProductCountOnPage =
  //           page === expectedPages
  //             ? expectedProductCount % productsPerPage || productsPerPage
  //             : productsPerPage;

  //         expect(matchingProducts).toHaveLength(expectedProductCountOnPage);
  //       });

  //       if (page === 1) {
  //         const BackPageButton = screen.queryByText("<<");
  //         expect(BackPageButton).toBeNull();
  //       }

  //       const nextPageButton = screen.queryAllByText(">>")[1];

  //       if (page < expectedPages) {
  //         fireEvent.click(nextPageButton);
  //       } else {
  //         expect(nextPageButton).toBeUndefined();
  //       }
  //     }
  //   });
});
