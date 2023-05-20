import React from "react";
import { Product } from "../../types/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <img
        src={
          !product.category.image
            ? "https://media.cnn.com/api/v1/images/stellar/prod/230124153647-01-monterey-park-vigil.jpg?c=16x9&q=w_800,c_fill"
            : product.category.image
        }
        className="card-img-top"
        alt="..."
        // style={{ width: '100%', height: 'auto' }}
        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
      />
      <p>{product.price} Euros</p>
    </div>
  );
};

export default ProductCard;
