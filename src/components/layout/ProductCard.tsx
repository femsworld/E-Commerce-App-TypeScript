import React, {useEffect} from "react";
import { Product } from "../../types/Product";
import { Link } from "react-router-dom";
import { SingleProduct } from "../../types/SingleProduct";
import { fetchSingleProduct } from "../../redux/reducers/productsReducer";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addItemToCart } from "../../redux/reducers/cartReducer";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cartReducer);

  const addOneItemToCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(addItemToCart(product));
  };

  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <img
        src={
          product.category && product.category.image
          ? product.category.image
          : "https://media.cnn.com/api/v1/images/stellar/prod/230124153647-01-monterey-park-vigil.jpg?c=16x9&q=w_800,c_fill"
        }
        className="card-img-top"
        alt="..."
        style={{ width: "100%", height: "auto", borderRadius: "8px" }}
      />
      <p>{product.price} Euros</p>
      <Link to={`/details/${product.id}`}>
        <button>Detail</button>
      </Link>
      <IconButton onClick={(e) => addOneItemToCart(e)} size="large" aria-label="shopping cart" color="inherit">
        <AddShoppingCartIcon />
      </IconButton> 
    </div>
  );
};

export default ProductCard

