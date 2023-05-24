import categoryReducer from "../../redux/reducers/categoryReducer";

describe("Testing categoryReducer", () => {
  test("Check initialState", () => {
    const state = categoryReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
            categories: [], 
            productByCategory: [],
            loading: false,
            error: ''
        });
  });
});
