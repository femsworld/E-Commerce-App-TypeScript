import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import PrimarySearchAppBar from './header'
import { fetchAllUsers } from '../../redux/reducers/usersReducer'
import { FetchQuery, fetchAllProducts } from '../../redux/reducers/productsReducer'
import useAppDispatch from '../../hooks/useAppDispatch'
import useAppSelector from '../../hooks/useAppSelector'
import { Product } from '../../types/Product'
import Pagination from '@mui/material/Pagination'
import ProductCard from './ProductCard'


const getFilteredProductList = (products: Product[], search: string) => {
    return products.filter(product => product.title.toLowerCase().includes(search.toLocaleLowerCase()))
  }

const Home = () => {
const dispatch = useAppDispatch()
const [search, setSearch] = useState("")
const {products} = useAppSelector(state => state.productsReducer )
const filterProducts = getFilteredProductList(products, search)
const [page, setPage] = useState(1);

// const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
//   setPage(value);
//   fetchAllProducts()

//   // const fetchQuery: FetchQuery = { offset: value, limit: 10 };
//   // dispatch(fetchAllProducts(fetchQuery));
// };

const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  setPage(value);
  const fetchQuery: FetchQuery = {
    offset: value,
    limit: 10,
  };
  dispatch(fetchAllProducts(fetchQuery));
};

    useEffect(() => {
        dispatch(fetchAllProducts({ offset: 1, limit: 10 }))
      }, [])
      // console.log(users)
    //   console.log(products)

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        }

  return (
    <div>
      Home
      <div>
        <PrimarySearchAppBar />
      </div>
      <div className="product-grid">
      {filterProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
      <Pagination 
        count={100} 
        page={page}
        onChange={handleChange}
      />
    </div>
  );
};
  
  export default Home;
  
  

  