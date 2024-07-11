import mongoose, { Document, Schema } from "mongoose";

interface IStopPointDemo extends Document {
  creationDate: string;
  creator: string;
  editionDate: string;
  editor: string;
  status: string;
  id: number;
  validFrom: string;
  validTo: string;
  etagVersion: number;
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
  interoperable: string;
  url: string;
  visualInfo: string;
  wheelchairTicketMachine: string;
  assistanceRequestFulfilled: string;
  ticketMachine: string;
  reduced: boolean;
}

const StopPointDemoSchema: Schema = new Schema({
  creationDate: { type: String },
  creator: { type: String },
  editionDate: { type: String },
  editor: { type: String },
  status: { type: String },
  id: { type: String, unique: true, required: true },
  validFrom: { type: String },
  validTo: { type: String },
  etagVersion: { type: Number },
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
  interoperable: { type: String },
  url: { type: String },
  visualInfo: { type: String },
  wheelchairTicketMachine: { type: String },
  assistanceRequestFulfilled: { type: String },
  ticketMachine: { type: String },
  reduced: { type: Boolean },
});

StopPointDemoSchema.index({ id: 1 }, { unique: true });

let StopPointDemo: mongoose.Model<IStopPointDemo>;

export function StopPointToStoreForDemo(): mongoose.Model<IStopPointDemo> {
  if (!StopPointDemo) {
    StopPointDemo =
      mongoose.models?.StopPointDemo ||
      mongoose.model<IStopPointDemo>("StopPointDemo", StopPointDemoSchema);
  }
  return StopPointDemo;
}

export default StopPointToStoreForDemo;