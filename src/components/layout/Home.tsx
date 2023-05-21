import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite'

import Header from "./header";
import { fetchAllUsers } from "../../redux/reducers/usersReducer";
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
import { Category } from "../../types/Category";
import { addOneFav, removeFromFav } from "../../redux/reducers/favReducer";
import { Icon, IconButton } from "@mui/material";

const getFilteredProductList = (products: Product[], search: string) => {
  return products.filter((product) =>
    product.title.toLowerCase().includes(search.toLocaleLowerCase())
  );
};

// const getFilteredCategoryList = () => {
//   // return categories.filter(categories => categories.name.toLowerCase().includes(search.toLocaleLowerCase()))
//   return categories.filter(category => category.name.toLowerCase().includes(search.toLocaleLowerCase()))
// }

const Home = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const { products } = useAppSelector((state) => state.productsReducer);
  const { categories } = useAppSelector((state) => state.categoryReducer);
  const { productByCategory } = useAppSelector(
    (state) => state.categoryReducer
  );
  const filterProducts = getFilteredProductList(products, search);
  const favIds = useAppSelector((state) => state.favReducer);
  const favList = products.filter((product) => favIds.includes(product.id));
  // const fetchAllCategories = getFilteredCategoryList()
  const [page, setPage] = useState(1);

  // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(value);
  //   fetchAllProducts()

  //   const fetchQuery: FetchQuery = { offset: value, limit: 10 };
  //   dispatch(fetchAllProducts(fetchQuery));
  // };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const fetchQuery: FetchQuery = {
      offset: value,
      limit: 6,
    };
    dispatch(fetchAllProducts(fetchQuery));
  };

  // const getProductByCategoryId = (event: React.ChangeEvent<unknown>, categoryID: number) => {
  const getProductByCategoryId = (categoryID: number) => {
    const fetchQuery: FetchQueryCategory = {
      offset: page,
      limit: 10,
      categoryID: categoryID,
    };
    dispatch(fetchAllCategoriesId(fetchQuery));
  };
  console.log("product by category", productByCategory);

  useEffect(() => {
    dispatch(fetchAllProducts({ offset: 1, limit: 6 }));
    dispatch(fetchAllCategories());
    // dispatch(fetchAllCategoriesId({ offset: 1, limit: 10, categoryID:  }))
  }, []);
  // console.log(users)
  // console.log("Category list",categories)

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  // const productCategories = filterProducts.filter()

  const toggleFav = (id: number) => {
    if (favIds.includes(id)) {
      dispatch(removeFromFav(id));
    } else {
      dispatch(addOneFav(id));
    }
  };

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
      {/* <div className="product-grid">
        {filterProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div> */}
      <div className="product-grid">
      {filterProducts.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
          <IconButton
            onClick={() => toggleFav(product.id)}
            color={favIds.includes(product.id) ? "success" : "info"}
          >
            <FavoriteIcon />
          </IconButton>
        </div>
      ))}
      </div>
      <Pagination count={100} page={page} onChange={handleChange} />
    </div>
  );
};

export default Home;
