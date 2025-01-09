import Design from "../models/design.model.js";
import jwt from 'jsonwebtoken';

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

export const getDesignsByShopId = async (req, res) => {
  try {
    const { shopId } = req.params; // Get the shopId from the request params
    
    // Find designs where shopId matches
    const designs = await Design.find({ shopId });

    if (!designs.length) {
      return res.status(404).json({ message: "No designs found for this shop." });
    }

    res.status(200).json({ designs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateDesignStatus = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // 'confirm' or 'reject'

  try {
    const design = await Design.findById(id);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    if (action === 'confirm') {
      design.isAccept = true;
      design.isReject = false;
    } else if (action === 'reject') {
      design.isReject = true;
      design.isConfirm = false;
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await design.save();
    res.status(200).json({ message: 'Design status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating design status', error: error.message });
  }
};


export const getUserDesigns = async (req, res) => {
  try {
    const designs = await Design.find({ userId: req.user._id });
    console.log('Designs found:', designs); // Check the found designs
    if (!designs || designs.length === 0) {
      return res.status(404).json({ message: 'No design requests found' });
    }
    res.json({ designs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getDesignRequestsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const designs = await Design.find({ userId: userId });

    if (!designs || designs.length === 0) {
      return res.status(404).json({ message: 'No Design Requests found for this user.' });
    }

    res.status(200).json({ designs }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

