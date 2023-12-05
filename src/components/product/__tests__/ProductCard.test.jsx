import { beforeEach, describe, expect } from "vitest";
import ProductCard from "../ProductCard";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { CartContext } from "../../../context/CartContext";

//adds products to cart when add to cart button is clicked

describe("ProductCard Component", () => {
  let mockCartItemState;
  const setMockCartItems = vi.fn((newCartItem) => {
    mockCartItemState = newCartItem;
  });

  const product = {
    _id: 1,
    product_name: "Test Product",
    product_price: 100,
    product_description: "test description",
  };

  beforeEach(() => {
    const testRouter = createMemoryRouter(
      [
        {
          path: "/",
          element: (
            <ProductCard
              product={product}
              addToCart={(value) => {
                setMockCartItems(value);
              }}
            />
          ),
        },
      ],
      { initialEntries: ["/"] }
    );

    render(
      <ChakraProvider>
        <CartContext.Provider
          value={{
            cartItems: mockCartItemState,
            setCartItems: setMockCartItems,
          }}
        >
          <RouterProvider router={testRouter}></RouterProvider>
        </CartContext.Provider>
      </ChakraProvider>
    );
  });

  it("Adds product to cart when add to cart button is clicked", async () => {
    const addToCartButton = await screen.findByTestId("add-to-cart");
    fireEvent.click(addToCartButton);

    // check the function is called
    expect(setMockCartItems).toHaveBeenCalled();
    // check that the cart item is updated
    expect(mockCartItemState).toContain(product);
  });
});
