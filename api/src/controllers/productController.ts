import { Request, RequestHandler, Response } from "express";
import productModel from "../models/product";

const findProducts: RequestHandler = async (req: Request, res: Response) => {
    try {
        const products = await productModel.find({ 
            title: { $regex: req.params.title },
        });
        return res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
};
const getAllProducts: RequestHandler = async (req: Request, res: Response) => {
    try {
        const products = await productModel.find();
        return res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
};
const createProduct: RequestHandler = async (req: Request, res: Response) => {
    try {
        const foundProduct = await productModel.findOne({ title: req.body.title });
        if (foundProduct) {
            return res.status(302).json({ message: 'The product is already registered' });
        }
        const product = new productModel(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
};
const updateProduct: RequestHandler = async (req: Request, res: Response) => {
    try {
        const productUpdated = await productModel.findByIdAndUpdate(req.params.id, req.body);
        if (productUpdated) {
            return res.status(201).json({ message: 'The product was updated successfully' })
        } else {
            return res.status(204).json({ message: 'The product doesn\'t exist' })
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
const deleteProduct: RequestHandler = async (req: Request, res: Response) => {
    try {
        const productDeleted = await productModel.findByIdAndDelete(req.params.id);
        if (productDeleted) {
            return res.status(200).json({ message: 'The product was deleted successfully' })
        } else {
            return res.status(204).json({ message: 'The product doesn\'t exist' })
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export default {
    findProducts,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
}
