import Cake from "../models/cake.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    if (!req.body.title || !req.body.description || !req.body.price) {
      return next(errorHandler(400, 'Please provide all required fields'));
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const newCake = new Cake({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    const savedCake = await newCake.save();
    res.status(201).json(savedCake);
  } catch (error) {
    next(error);
  }
}
export const getCakes = async (req, res, next) => {
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

    const totalProducts = await Cake.countDocuments(queryOptions);
    const products = await Cake.find(queryOptions)
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


export const updateCake = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this post'));
    }
    if (!req.body.title || !req.body.description || !req.body.price ) {
      return next(errorHandler(400, 'Please provide all required fields'));
    }

    const updatedCake = await Cake.findByIdAndUpdate(
      req.params.productId,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          images: req.body.images,
          price: req.body.price,
          type: req.body.type,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedCake);
  } catch (error) {
    next(error);
  }
};

export const deletecake = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this post'));
    }
    await Cake.findByIdAndDelete(req.params.productId);
    res.status(200).json('The product has been deleted');
  } catch (error) {
    next(error);
  }
};

export const featureCake = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this product'));
    }

    const updatedCake = await Cake.findByIdAndUpdate(
      req.params.productId,
      { $set: { isfeature: true } },
      { new: true }
    );
    res.status(200).json(updatedCake);
  } catch (error) {
    next(error);
  }
};

export const unfeatureCake = async (req, res, next) => {
  try {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this product'));
    }

    const updatedCake = await Cake.findByIdAndUpdate(
      req.params.productId,
      { $set: { isfeature: false } },
      { new: true }
    );
    res.status(200).json(updatedCake);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedCakes = async (req, res, next) => {
  try {
    const featuredCakes = await Cake.find({ isfeature: true });
    res.status(200).json(featuredCakes);
  } catch (error) {
    next(error);
  }
};

export const getCakesByCategory = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 9 } = req.query;

    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    const queryOptions = { category };

    const totalProducts = await Cake.countDocuments(queryOptions);
    const products = await Cake.find(queryOptions)
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