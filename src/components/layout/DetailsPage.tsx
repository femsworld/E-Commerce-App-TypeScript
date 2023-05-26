import React, { useEffect, useState } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import { fetchSingleProduct } from "../../redux/reducers/productsReducer";
import { useParams } from "react-router-dom";
import useAppSelector from "../../hooks/useAppSelector";
import { SingleProduct } from "../../types/SingleProduct";

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { singleProduct } = useAppSelector((state) => state.productsReducer);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchSingleProduct({ id }));
  }, [id]);

  const goToNextImage = () => {
    const nextIndex =
      singleProduct?.images &&
      currentImageIndex &&
      (currentImageIndex + 1) % singleProduct?.images.length;
    nextIndex && setCurrentImageIndex(nextIndex);
  };

  const goToPreviousImage = () => {
    const previousIndex =
      singleProduct?.images &&
      currentImageIndex &&
      (currentImageIndex + singleProduct?.images.length - 1) %
        singleProduct?.images.length;
    previousIndex && setCurrentImageIndex(previousIndex);
  };

  return (
    <div>
      <div>
        <img
          src={
            singleProduct?.images && singleProduct?.images[currentImageIndex]
          }
          alt=""
        />
      </div>
      <div>
        <button onClick={goToPreviousImage}>Previous</button>
        <button onClick={goToNextImage}>Next</button>
      </div>
      <h4> {singleProduct?.title} </h4>
      <h4> Category: {singleProduct?.category?.name} </h4>
      <h4> Price: {singleProduct?.price} Euros </h4>
      <h4> ID: {singleProduct?.id} </h4>
    </div>
  );
};

export default DetailsPage;
