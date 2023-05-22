import React, { useEffect } from 'react'
import useAppDispatch from '../../hooks/useAppDispatch'
import useAppSelector from '../../hooks/useAppSelector'
import { addItemToCart } from '../../redux/reducers/cartReducer'

const CartPage = () => {
const dispatch = useAppDispatch()
const { items } = useAppSelector((state) => state.cartReducer)

// const itemsInCart = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     event.preventDefault();
//     dispatch(addItemToCart(items));
//     console.log("Checking for items in cart")
//   };

useEffect(() => {
    dispatch(addItemToCart(items))
}, [])

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
            </li>
            
          ))}
        </ul>
      )}
    </div>
  )
}

export default CartPage