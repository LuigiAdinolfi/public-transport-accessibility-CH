// platform.ts

import mongoose, { Document, Schema } from "mongoose";

interface IPlatform extends Document {
  id: string;
  sloid: string;
  parentServicePointSloid: string;
  boardingDevice: string;
  adviceAccessInfo: string;
  additionalInformation: string;
  contrastingAreas: string;
  dynamicAudio: string;
  dynamicVisual: string;
  height: string;
  inclination: string;
  inclinationLongitudinal: string;
  inclinationWidth: string;
  infoOpportunities: string[];
  levelAccessWheelchair: string;
  partialElevation: string;
  superelevation: string;
  tactileSystem: string;
  vehicleAccess: string;
  wheelchairAreaLength: string;
  wheelchairAreaWidth: string;
  // Add other necessary fields
}

// Define the schema for the Platform collection
const PlatformSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  sloid: { type: String, required: true },
  parentServicePointSloid: { type: String, required: true },
  boardingDevice: { type: String },
  adviceAccessInfo: { type: String },
  additionalInformation: { type: String },
  contrastingAreas: { type: String },
  dynamicAudio: { type: String },
  dynamicVisual: { type: String },
  height: { type: String },
  inclination: { type: String },
  inclinationLongitudinal: { type: String },
  inclinationWidth: { type: String },
  infoOpportunities: { type: [String] },
  levelAccessWheelchair: { type: String },
  partialElevation: { type: String },
  superelevation: { type: String },
  tactileSystem: { type: String },
  vehicleAccess: { type: String },
  wheelchairAreaLength: { type: String },
  wheelchairAreaWidth: { type: String },
  // Define other necessary fields
});

// Define a unique index on the 'id' field to enforce uniqueness
PlatformSchema.index({ id: 1 }, { unique: true });

let Platform: mongoose.Model<IPlatform>;

// Export the model function to ensure it's called after the connection is established
export function getPlatformModel(): mongoose.Model<IPlatform> {
  if (!Platform) {
    Platform =
      mongoose.models?.Platform ||
      mongoose.model<IPlatform>("Platform", PlatformSchema);
  }
  return Platform;
}

export default getPlatformModel;
