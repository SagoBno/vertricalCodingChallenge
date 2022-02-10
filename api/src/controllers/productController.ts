import { Request, RequestHandler, Response } from "express";
import productModel from "../models/product";

export const getProduct: RequestHandler = async (req, res) => {
    const foundProduct = await productModel.findById(req.params.id);
  
    if (!foundProduct) return res.status(204).json();
  
    return res.json(foundProduct);
  };

const getAllProducts: RequestHandler = async (req: Request, res: Response) => {
    try {
        let products;
        if (req.query.title) {
            products = await productModel.find({
                title: { $regex: req.query.title },
            });
        } else {
            products = await productModel.find();
        }
        console.log(products);
        return res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
};
const createProduct: RequestHandler = async (req: Request, res: Response) => {
    try {
        const foundProduct = await productModel.findOne({ title: req.body.title });
        if (foundProduct) {
            res.statusMessage = 'The product is already registered';
            return res.status(400).end();
        }
        const product = new productModel({
            ...req.body,
            shortDescription: req.body.description.substring(0, 15),
        });
        await product.save();
        res.status(201).json({message: 'Product created successfully'});
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
    getProduct,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
}
