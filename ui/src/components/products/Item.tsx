import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../interfaces/product';

interface Props {
  product: Product;
};

const Item = ({ product }: Props) => {

  const navigate = useNavigate()

  return (
    <div className="card m-2">
      <div className="d-flex">
        <img src={product.photo} alt={product.shortDescription} className="card-img-top"/>
        <div className="card-body">
          <h5
            className="card-title"
            onClick={() => navigate(`/${product._id}`)}
            style={{ cursor: 'pointer' }}
          >
            {product.title}
          </h5>
          <p className="card-text">{product.shortDescription}</p>
        </div>
      </div>
    </div>
  )
};

export default Item;
