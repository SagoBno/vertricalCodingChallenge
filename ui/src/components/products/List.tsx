import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { Product } from '../../interfaces/product';
import * as productService from '../../services/product';
import ProductItem from './Item';

const List = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [title, setTitle] = useState<String>('');

    const getProducts = async () => {
        const res = await productService.getProducts();
        setProducts(res.data);
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value);
    };

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const res = await productService.findProducts(title);
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, [])
    return (
        <React.Fragment>
            <form onSubmit={handleSearch}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Product title"
                        onChange={handleSearchChange}/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                            Search
                        </button>
                    </div>
                </div>
            </form>

            <div className="d-flex flex-wrap">
                {products.map((product) => {
                    return <ProductItem product={product} key={product._id}/>;
                })}
            </div>
        </React.Fragment>
    )
};

export default List;
