import axios from 'axios';
import { Product } from '../interfaces/product';

const api = 'http://localhost:3030';

const getProduct = async (id : String) => {
    return await axios.get(`${api}/products/${id}`);
};

const getProducts = async () => {
    return await axios.get(`${api}/products`);
};

const findProducts = async (title: String) => {
    return await axios.get(`${api}/products`, { params: { title } })
};

const createProduct = async(product: Product) => {
    return await axios.post(`${api}/products`, product);
};

export {
    getProduct,
    getProducts,
    findProducts,
    createProduct,
};
