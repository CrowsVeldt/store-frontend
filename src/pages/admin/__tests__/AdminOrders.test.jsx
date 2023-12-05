import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { beforeEach, describe, it, vi } from "vitest";
import AdminOrders from "../AdminOrders";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";

const numberOfOrders = 20;

const getAllOrders = vi.fn(() =>
  // mock getAllUsers from AdminUsers.jsx

  Promise.resolve(
    null

    // new Array(numberOfProducts).fill(null).map((_, index) => ({
    //   _id: String(index + 1),
    //   product_name: `Product ${index + 1}`,
    //   product_description: `Description ${index + 1}`,
    //   product_image: `Image ${index + 1}`,
    //   categories: [{ category: { category_name: `Category ${index + 1}` } }],
    // }))
  )
);

describe("Admin Orders Component", () => {
  const mockOrders = [];
  const setMockOrders = vi.fn();

  beforeEach(() => {
    const testRouter = createMemoryRouter(
      [{ path: "/", element: <AdminOrders />, loader: getAllOrders }],
      { initialEntries: ["/"] }
    );

    render(
      <ChakraProvider>
        <RouterProvider router={testRouter}></RouterProvider>
      </ChakraProvider>
    );
  });

  it("Displays Orders", async () => {
    const displayedOrders = await screen.findAllByTestId("order");
    expect(displayedOrders).toBeDefined();
  });
});
