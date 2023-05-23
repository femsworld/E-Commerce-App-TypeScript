import React, { useEffect } from 'react'
import useAppDispatch from '../../hooks/useAppDispatch'
import useAppSelector from '../../hooks/useAppSelector'
import { addItemToCart } from '../../redux/reducers/cartReducer'

const CartPage = () => {
const dispatch = useAppDispatch()
const { items } = useAppSelector((state) => state.cartReducer)
const { totalAmount } = useAppSelector((state) => state.cartReducer)

  return (
    <div>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <p>{item.title}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.price} Euros</p>
              <p>Item Id: {item.id} </p>
            </li>
          ))}
        </ul>
      )}
      <p>Total Amount: {totalAmount} Euros </p>
    </div>
  )
}

export default CartPage