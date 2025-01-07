import mongoose from 'mongoose';

const designSchema = new mongoose.Schema(
  {
    shopId: {
      type: String,
      required: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    cakeType: {
      type: String,
      required: true,
    },
    cakeShape: {
      type: String,
      required: true,
    },
    cakeSize: {
      type: String,
      required: true,
    },
    veganOption: {
      type: String,
      required: true,
    },
    addons: [String],
    isRequest: {
      type: Boolean,
      default: true, 
    },
    isAccept: {
      type: Boolean,
      default: false, 
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Design = mongoose.model('Design', designSchema);

export default Design;
