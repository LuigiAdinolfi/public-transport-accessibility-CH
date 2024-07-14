import { StopPoint } from "@/types/StopPoint";

export function storeStopPointToDB(stopPointsData: StopPoint[]): any[] {
  return stopPointsData.map((stopPoint: StopPoint) => ({
    id: stopPoint.id,
    sloid: stopPoint.sloid,
    meansOfTransport: stopPoint.meansOfTransport,
    freeText: stopPoint.freeText,
    address: stopPoint.address,
    zipCode: stopPoint.zipCode,
    city: stopPoint.city,
    alternativeTransport: stopPoint.alternativeTransport,
    alternativeTransportCondition: stopPoint.alternativeTransportCondition,
    assistanceAvailability: stopPoint.assistanceAvailability,
    assistanceCondition: stopPoint.assistanceCondition,
    assistanceService: stopPoint.assistanceService,
    audioTicketMachine: stopPoint.audioTicketMachine,
    additionalInformation: stopPoint.additionalInformation,
    dynamicAudioSystem: stopPoint.dynamicAudioSystem,
    dynamicOpticSystem: stopPoint.dynamicOpticSystem,
    infoTicketMachine: stopPoint.infoTicketMachine,
    visualInfo: stopPoint.visualInfo,
    wheelchairTicketMachine: stopPoint.wheelchairTicketMachine,
    assistanceRequestFulfilled: stopPoint.assistanceRequestFulfilled,
    ticketMachine: stopPoint.ticketMachine,
  }));
}
