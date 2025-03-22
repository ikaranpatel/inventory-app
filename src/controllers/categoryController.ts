import { Request, Response, NextFunction } from 'express';
import { CategoryModel } from '../models/categoryModel';

// Create Category
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    const category = new CategoryModel({ name, description });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// Get all Categories
export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// Update Category
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.params.id;
    const { name, description } = req.body;

    const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, { name, description }, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

// Delete Category
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.params.id;

    const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
};
