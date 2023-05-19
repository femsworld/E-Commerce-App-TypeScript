import React from 'react';
import { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <p>{product.price} Euros</p>
      {/* Additional card content here */}
    </div>
  );
};

export default ProductCard;
