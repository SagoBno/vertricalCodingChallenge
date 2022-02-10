import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../interfaces/product';
import * as productService from '../../services/product';

const Fullsize = () => {
    const params = useParams();
    const [product, setProduct] = useState<Product>({title: '', photo: '', description: ''});


    const getProduct = async (id: String) => {
        const res = await productService.getProduct(id);
        const { title, description, photo } = res.data;
        setProduct({ title, description, photo });
    };

    useEffect(() => {
        if (params.id) getProduct(params.id);
    }, []);
  return (
    <div className="d-flex justify-content-center">
        <div className='card'>
            <img style={{ width: '100%' }} className="card-img-top" src={product.photo} alt={product.shortDescription}/>
            <div className="card-body">
                <h5 className="card-title">{ product.title }</h5>
                <p className="card-text">{ product.description }</p>
            </div>
        </div>
    </div>
  )
};

export default Fullsize;
