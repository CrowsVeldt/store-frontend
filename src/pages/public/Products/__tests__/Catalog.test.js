import { beforeEach, describe, vi } from "vitest";

const getAllProducts = vi.fn(() => {
  Promise.resolve(
    new Array(20).fill(null).map((_, index) => ({
      _id: String(index + 1),
      product_name: `Product ${index + 1}`,
      product_description: `Description ${index + 1}`,
    }))
  );
});

describe("Catalog Component", () => {
  beforeEach(() => {
    // do something
  });

  it("Handle search input changed to 1 + test pagination", () => {});
});
