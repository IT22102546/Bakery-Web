import { errorHandler } from "../utils/error.js";
import User from '../models/user.model.js';
import Sweet from "../models/sweet.model.js";

export const create = async (req, res, next) => {
    try {
      console.log("Request body:", req.body); // Debug log
      if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'));
      }
      if (!req.body.title || !req.body.description || !req.body.price) {
        return next(errorHandler(400, 'Please provide all required fields'));
      }
  
      const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');
      const newSweet = new Sweet({
        ...req.body,
        slug,
        userId: req.user.id,
      });
  
      const savedSweet = await newSweet.save();
      console.log("Saved sweet:", savedSweet); // Debug log
      res.status(201).json(savedSweet);
    } catch (error) {
      console.error("Error saving sweet:", error); // Debug log
      next(error);
    }
  };
  
export const getSweets  = async (req, res, next) => {
  try {
    const { slug, searchTerm, page = 1, limit = 9, category, priceRange } = req.query;
    const queryOptions = {};

    if (slug) {
      queryOptions.slug = slug;
    }

    if (searchTerm) {
      queryOptions.title = { $regex: searchTerm, $options: 'i' };
    }

    if (category) {
      queryOptions.category = category;
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      queryOptions.price = { $gte: minPrice, $lte: maxPrice };
    }

    const totalProducts = await Sweet.countDocuments(queryOptions);
    const products = await Sweet.find(queryOptions)
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .populate('userId', 'username') 
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    next(error);
  }
};



export const updateSweet = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this post'));
    }
    if (!req.body.title || !req.body.description || !req.body.price ) {
      return next(errorHandler(400, 'Please provide all required fields'));
    }

    const updatedSweet = await Sweet.findByIdAndUpdate(
      req.params.productId,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          images: req.body.images,
          price: req.body.price,
          
        },
      },
      { new: true }
    );
    res.status(200).json(updatedSweet);
  } catch (error) {
    next(error);
  }
};

export const deletesweet = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this post'));
    }
    await Sweet.findByIdAndDelete(req.params.productId);
    res.status(200).json('The product has been deleted');
  } catch (error) {
    next(error);
  }
};

export const featureSweet = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this product'));
    }

    const updatedSweet = await Sweet.findByIdAndUpdate(
      req.params.productId,
      { $set: { isFeature: true } },
      { new: true }
    );
    res.status(200).json(updatedSweet);
  } catch (error) {
    next(error);
  }
};

export const unfeatureSweet = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this product'));
    }

    const updatedSweet = await Sweet.findByIdAndUpdate(
      req.params.productId,
      { $set: { isFeature: false } },
      { new: true }
    );
    res.status(200).json(updatedSweet);
  } catch (error) {
    next(error);
  }
};

export const available = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this product'));
    }

    const updatedSweet = await Sweet.findByIdAndUpdate(
      req.params.productId,
      { $set: { isAvailable: true } },
      { new: true }
    );
    res.status(200).json(updatedSweet);
  } catch (error) {
    next(error);
  }
};


export const unavailable = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this product'));
    }

    const updatedSweet = await Sweet.findByIdAndUpdate(
      req.params.productId,
      { $set: { isAvailable: false } },
      { new: true }
    );
    res.status(200).json(updatedSweet);
  } catch (error) {
    next(error);
  }
};


export const getFeaturedSweets = async (req, res, next) => {
  try {
    const updatedSweet = await Sweet.find({ isFeature: true });
    res.status(200).json(updatedSweet);
  } catch (error) {
    next(error);
  }
};

export const getSweetsByCategory = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 9 } = req.query;

    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const queryOptions = { category };

    const totalProducts = await Sweet.countDocuments(queryOptions);
    const products = await Sweet.find(queryOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    next(error);
  }
};

export const admingetSweets = async (req, res, next) => {
  try {
    const { slug, searchTerm, page = 1, limit = 9, category, priceRange } = req.query;
    const queryOptions = { userId: req.user.id }; 

    if (slug) {
      queryOptions.slug = slug;
    }

    if (searchTerm) {
      queryOptions.title = { $regex: searchTerm, $options: 'i' };
    }

    if (category) {
      queryOptions.category = category;
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      queryOptions.price = { $gte: minPrice, $lte: maxPrice };
    }

    const totalProducts = await Sweet.countDocuments(queryOptions);
    const products = await Sweet.find(queryOptions)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    next(error);
  }
};


