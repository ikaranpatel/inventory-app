import { Request, Response, NextFunction } from 'express';
import { ProductModel } from '../models/productModel';
import { RouteError } from '@src/middleware/errorHandler';

// Controller for creating a product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, categories, quantity, price, supplierInfo } = req.body;
    const product = new ProductModel({
      name,
      description,
      categories,
      quantity,
      price,
      supplierInfo,
    });
    await product.save();
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// Controller for fetching all products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, category, minPrice, maxPrice, inStock } = req.query;

    let filter: any = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      filter.categories = { $in: category };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    if (inStock) {
      filter.quantity = { $gt: 0 };
    }

    const products = await ProductModel.find(filter).populate('categories', 'name').exec();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// Controller for fetching a product by ID
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return next(new RouteError('Product not found', 404)); // If product not found, return error
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// Controller for updating a product
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, description, categories, quantity, price, supplierInfo } = req.body;

    const product = await ProductModel.findById(id);
    if (!product) {
      return next(new RouteError('Product not found', 404)); // If product not found, return error
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.categories = categories || product.categories;
    product.quantity = quantity || product.quantity;
    product.price = price || product.price;
    product.supplierInfo = supplierInfo || product.supplierInfo;
    product.lastUpdated = new Date();

    await product.save();
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// Controller for deleting a product
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Controller for updating stock level
export const updateStockLevel = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.quantity = quantity;
    product.lastUpdated = new Date();
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Stock level updated successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// Controller for fetching low stock alerts
export const getLowStockAlerts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lowStockProducts = await ProductModel.find({ quantity: { $lt: 10 } });
    res.status(200).json({
      success: true,
      data: lowStockProducts,
    });
  } catch (error) {
    next(error);
  }
};
