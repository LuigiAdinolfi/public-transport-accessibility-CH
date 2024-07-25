import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the ParkingLot document that extends Mongoose's Document
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

/**
 * Returns the Mongoose model for the ParkingLot collection.
 *
 * If the model does not already exist, it creates it using the schema defined.
 * Utilizes Mongoose's model caching to avoid creating multiple models with the same name.
 *
 * @returns {mongoose.Model<IParkingLot>} The Mongoose model for the ParkingLot collection.
 */
export function ParkingLotToStore(): mongoose.Model<IParkingLot> {
  if (!ParkingLot) {
    ParkingLot =
      mongoose.models?.ParkingLot ||
      mongoose.model<IParkingLot>("ParkingLot", ParkingLotSchema);
  }
  return ParkingLot;
}

export default ParkingLotToStore;
