import mongoose, { Document, Schema } from "mongoose";

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
  visualInfo: string;
  wheelchairTicketMachine: string;
  assistanceRequestFulfilled: string;
  ticketMachine: string;
}

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
  visualInfo: { type: String },
  wheelchairTicketMachine: { type: String },
  assistanceRequestFulfilled: { type: String },
  ticketMachine: { type: String },
});

StopPointSchema.index({ id: 1, sloid: 1 }, { unique: true });

let StopPoint: mongoose.Model<IStopPoint>;

export function StopPointToStore(): mongoose.Model<IStopPoint> {
  if (!StopPoint) {
    StopPoint =
      mongoose.models?.StopPoint ||
      mongoose.model<IStopPoint>("StopPoint", StopPointSchema);
  }
  return StopPoint;
}
