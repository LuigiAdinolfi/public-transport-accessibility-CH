/**
 * Interface for the StopPoint object
 */
export interface StopPoint {
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
