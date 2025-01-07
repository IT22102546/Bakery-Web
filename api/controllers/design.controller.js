import Design from "../models/design.model.js";

export const saveDesign = async (req, res) => {
  const { shopId, shopName, cakeType, cakeShape, cakeSize, veganOption, addons, userId } = req.body;

  console.log("details", shopId, shopName, cakeType, cakeShape, cakeSize, veganOption, addons, userId )

  try {
    // Ensure addons is a valid JSON string or default to an empty array
    const parsedAddons = addons ? JSON.parse(addons) : [];

    // Create a new design object
    const newDesign = new Design({
      shopId,
      shopName,
      cakeType,
      cakeShape,
      cakeSize,
      veganOption,
      addons: parsedAddons, 
      userId,  
    });

    // Save the design to the database
    await newDesign.save();

    // Return success response
    res.status(201).json({
      message: 'Design saved successfully!',
      design: newDesign,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving design.' });
  }
};
