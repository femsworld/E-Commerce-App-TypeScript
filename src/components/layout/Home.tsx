import React, { useEffect, useState } from "react";

import Header from "./header";
import {
  FetchQuery,
  fetchAllProducts,
} from "../../redux/reducers/productsReducer";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { Product } from "../../types/Product";
import Pagination from "@mui/material/Pagination";
import ProductCard from "./ProductCard";
import {
  FetchQueryCategory,
  fetchAllCategories,
  fetchAllCategoriesId,
} from "../../redux/reducers/categoryReducer";
import { ProductByCategory } from "../../types/ProductByCategory";
import { fabClasses } from "@mui/material";

const getFilteredProductList = (products: Product[], search: string) => {
  return products.filter((product) =>
    product.title && product.title.toLowerCase().includes(search.toLocaleLowerCase())
  );
};
  
const getProductList = (products: Product[], productByCategory: Product[]) => {
  return productByCategory.length > 0 ? productByCategory : products
};

const Home = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  // const [items, setItems] = useState([]); // This is the items to be displayed on every render
  const [items, setItems] = useState<Product[]>([]);
  // const [itemsByProductCategories, setItemsByProductCategories] = useState(false)
  const { products } = useAppSelector((state) => state.productsReducer);
  const { categories } = useAppSelector((state) => state.categoryReducer);
  const { productByCategory } = useAppSelector(
    (state) => state.categoryReducer
  );
  // const filterProducts = getFilteredProductList(products, search);
  const [page, setPage] = useState(1);

  const filterProducts = getProductList(products, productByCategory);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const fetchQuery: FetchQuery = {
      offset: value,
      limit: 6,
    };
    dispatch(fetchAllProducts(fetchQuery));
  };

  const getProductByCategoryId = (categoryID: number) => {
    const fetchQuery: FetchQueryCategory = {
      offset: page,
      limit: 6,
      categoryID: categoryID,
    };
    dispatch(fetchAllCategoriesId(fetchQuery));
  };

  useEffect(() => {
      dispatch(fetchAllProducts({ offset: 1, limit: 6 }));
      dispatch(fetchAllCategories());
  }, []); // Add a variable to the dependency array to track when user has selected a category

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  console.log("Product By category", productByCategory);

  return (
    <div>
      Home
      <div>
        <Header />
      </div>
      <div className="category-grid">
        {categories.map((category) => (
          <button
            onClick={() => getProductByCategoryId(category.id)}
            key={category.id}
          >
            {" "}
            {category.name}{" "}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {/* {filterProducts.map(
          (
            product // Change filterProducts to items defined in the state
          ) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          )
        )} */}
        {filterProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <Pagination count={100} page={page} onChange={handleChange} />
    </div>
  );
};

export default Home;
