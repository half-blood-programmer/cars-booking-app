import mongoose from "mongoose";
const { Schema } = mongoose;

// create table vehicle
const VehicleSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String, required: true },
  maxPeople: { type: Number, required: true },
  vehicleNumbers: [{ number: Number, unavaibleDates: [{ type: [Date] }] }],
});

export default mongoose.model("Vehicle", VehicleSchema);
