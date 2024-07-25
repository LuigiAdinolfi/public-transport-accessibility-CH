import { StopPoint } from "@/types/StopPoint";

/**
 * Converts an array of `StopPoint` objects into a format suitable for database storage.
 * This function maps each `StopPoint` object to a new object with the same properties for database storage.
 *
 * @param {StopPoint[]} stopPointsData - An array of `StopPoint` objects to be converted.
 * @returns {any[]} - An array of objects formatted for database storage.
 */
export function storeStopPointToDB(stopPointsData: StopPoint[]): any[] {
  // Map each StopPoint object to a new format suitable for database storage
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
    interoperable: stopPoint.interoperable,
    visualInfo: stopPoint.visualInfo,
    wheelchairTicketMachine: stopPoint.wheelchairTicketMachine,
    assistanceRequestFulfilled: stopPoint.assistanceRequestFulfilled,
    ticketMachine: stopPoint.ticketMachine,
  }));
}
