import Cake from "../models/cake.model.js";
import Sweet from "../models/sweet.model.js";


export const getSearch = async (req, res) => {
  const { searchTerm, category } = req.query;

  try {
    const searchCriteria = {};

    if (searchTerm) {
      searchCriteria.title = { $regex: searchTerm, $options: "i" };
    }

    if (category) {
      searchCriteria.category = category; // Filter by category
    }

    const cakes = await Cake.find(searchCriteria).limit(10);
    const sweets = await Sweet.find(searchCriteria).limit(10);

    res.json({
      results: [...cakes, ...sweets], // Combine cakes and sweets
    });
  } catch (error) {
    console.error("Error in getSearch:", error);
    res.status(500).json({ error: "An error occurred during the search" });
  }
};


export const getCategories = async (req, res, next) => {
  try {
    const cakeCategories = await Cake.distinct("category");
    const sweetCategories = await Sweet.distinct("category");

    res.status(200).json({
      cakeCategories, 
      sweetCategories, 
    });
  } catch (error) {
    console.error("Error in categories route:", error);
    next(error);
  }
};
