/**
 * Interface for the StopPointForDemo object
 */
export interface StopPointForDemo {
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
