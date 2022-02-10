import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Product } from '../../interfaces/product';
import * as productService from '../../services/product';

const Form = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product>({title: '', photo: '', description: ''});

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({
            ...product,
            [ e.target.name ]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const res = await productService.createProduct(product);
            toast.success(res.data.message);
            navigate('/');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className="row justify-content-center">
                <div className="card col-md-5">
                    <div className="card-body">
                        <h5 className="card-title">Product</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="title"
                                    placeholder="Product name"
                                    autoFocus
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="photo"
                                    placeholder="Paste the url of a product photo"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    className="form-control"
                                    name="description"
                                    rows={5}
                                    placeholder="Write a description of the product"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button className="btn btn-primary" type="submit">
                                Create new product
                            </button>
                        </form>
                    </div>
            </div>
        </div>
    )
};

export default Form;
