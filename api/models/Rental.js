import mongoose from "mongoose";
const { Schema } = mongoose;

// create table Rental
const rentalSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
    addres: { type: String, required: true },
    distance: { type: String, required: true },
    photos: { type: [String] },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },
    vehicles: { type: [String] },
    cheapestPrice: { type: Number, required: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Rental", rentalSchema);
