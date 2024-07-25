import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the StopPoint document that extends Mongoose's Document
export interface IStopPoint extends Document {
  id: number;
  sloid: string;
  meansOfTransport: string[];
  freeText: string;
  address: string;
  zipCode: string;
  city: string;
  alternativeTransport: string;
  alternativeTransportCondition: string;
  assistanceAvailability: string;
  assistanceCondition: string;
  assistanceService: string;
  audioTicketMachine: string;
  additionalInformation: string;
  dynamicAudioSystem: string;
  dynamicOpticSystem: string;
  infoTicketMachine: string;
  interoperable: boolean;
  visualInfo: string;
  wheelchairTicketMachine: string;
  assistanceRequestFulfilled: string;
  ticketMachine: string;
}

// Define the schema for the StopPoint collection
const StopPointSchema: Schema = new Schema({
  id: { type: Number, unique: true, required: true },
  sloid: { type: String, required: true },
  meansOfTransport: { type: [String] },
  freeText: { type: String },
  address: { type: String },
  zipCode: { type: String },
  city: { type: String },
  alternativeTransport: { type: String },
  alternativeTransportCondition: { type: String },
  assistanceAvailability: { type: String },
  assistanceCondition: { type: String },
  assistanceService: { type: String },
  audioTicketMachine: { type: String },
  additionalInformation: { type: String },
  dynamicAudioSystem: { type: String },
  dynamicOpticSystem: { type: String },
  infoTicketMachine: { type: String },
  interoperable: { type: Boolean },
  visualInfo: { type: String },
  wheelchairTicketMachine: { type: String },
  assistanceRequestFulfilled: { type: String },
  ticketMachine: { type: String },
});

// Define a unique index on the combination of 'id' and 'sloid' fields
StopPointSchema.index({ id: 1, sloid: 1 }, { unique: true });

let StopPoint: mongoose.Model<IStopPoint>;

/**
 * Returns the Mongoose model for the StopPoint collection.
 *
 * If the model does not already exist, it creates it using the schema defined.
 * Utilizes Mongoose's model caching to avoid creating multiple models with the same name.
 *
 * @returns {mongoose.Model<IStopPoint>} The Mongoose model for the StopPoint collection.
 */
export function StopPointToStore(): mongoose.Model<IStopPoint> {
  if (!StopPoint) {
    StopPoint =
      mongoose.models?.StopPoint ||
      mongoose.model<IStopPoint>("StopPoint", StopPointSchema);
  }
  return StopPoint;
}

export default StopPointToStore;
