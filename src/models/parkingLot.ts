import mongoose, { Document, Schema } from "mongoose";

interface IParkingLot extends Document {
  id: string;
  sloid: string;
  parentServicePointSloid: string;
  designation: string;
  additionalInformation: string;
  placesAvailable: string;
  prmPlacesAvailable: string;
}

// Define the schema for the ParkingLot collection
const ParkingLotSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  sloid: { type: String, required: true },
  parentServicePointSloid: { type: String, required: true },
  designation: { type: String },
  additionalInformation: { type: String },
  placesAvailable: { type: String },
  prmPlacesAvailable: { type: String },
});

// Define a unique index on the 'id' field to enforce uniqueness
ParkingLotSchema.index({ id: 1 }, { unique: true });

let ParkingLot: mongoose.Model<IParkingLot>;

// Define the model for the ParkingLot collection
export function ParkingLotToStore(): mongoose.Model<IParkingLot> {
  if (!ParkingLot) {
    ParkingLot =
      mongoose.models?.ParkingLot ||
      mongoose.model<IParkingLot>("ParkingLot", ParkingLotSchema);
  }
  return ParkingLot;
}

export default ParkingLotToStore;
