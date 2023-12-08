import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { beforeEach, describe, it, vi } from "vitest";
import AdminUsers from "../AdminUsers";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";

const numberOfUsers = 20;

const getAllUsers = vi.fn(() =>
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

describe("Admin Users Component", () => {
  const mockUsers = [];
  const setMockUsers = vi.fn();

  beforeEach(() => {
    const testRouter = createMemoryRouter(
      [{ path: "/", element: <AdminUsers />, loader: getAllUsers }],
      { initialEntries: ["/"] }
    );

    render(
      <ChakraProvider>
        <RouterProvider router={testRouter}></RouterProvider>
      </ChakraProvider>
    );
  });

  it("Displays Users", async () => {
    const displayedUsers = await screen.findAllByTestId("user");
    expect(displayedUsers).toBeDefined();
  });
});
