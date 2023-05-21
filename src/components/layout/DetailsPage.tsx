import React, { useEffect } from 'react'
import useAppDispatch from '../../hooks/useAppDispatch';
import { fetchSingleProduct } from '../../redux/reducers/productsReducer';
import { useParams } from 'react-router-dom';
import useAppSelector from '../../hooks/useAppSelector';

const DetailsPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { singleProduct } = useAppSelector((state) => state.productsReducer);

    useEffect(() => {
        dispatch(fetchSingleProduct({id})) 
    }, [id])
    console.log("Product details: ", singleProduct)
  return (
    <div>DetailsPage</div>
  )
}

export default DetailsPage