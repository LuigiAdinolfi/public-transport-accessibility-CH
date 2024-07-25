import { StopPointForDemo } from "@/types/StopPointForDemo";

/**
 * Converts an array of `StopPointForDemo` objects into a format suitable for database storage.
 * This function maps each `StopPointForDemo` object to a new object with the same properties, including metadata and additional fields.
 *
 * @param {StopPointForDemo[]} stopPointsData - An array of `StopPointForDemo` objects to be converted.
 * @returns {any[]} - An array of objects formatted for database storage.
 */
export function storeStopPointToDBForDemo(
  stopPointsData: StopPointForDemo[],
): any[] {
  // Map each StopPointForDemo object to a new format suitable for database storage
  return stopPointsData.map((stopPoint: StopPointForDemo) => ({
    creationDate: stopPoint.creationDate,
    creator: stopPoint.creator,
    editionDate: stopPoint.editionDate,
    editor: stopPoint.editor,
    status: stopPoint.status,
    id: stopPoint.id,
    validFrom: stopPoint.validFrom,
    validTo: stopPoint.validTo,
    etagVersion: stopPoint.etagVersion,
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
    url: stopPoint.url,
    visualInfo: stopPoint.visualInfo,
    wheelchairTicketMachine: stopPoint.wheelchairTicketMachine,
    assistanceRequestFulfilled: stopPoint.assistanceRequestFulfilled,
    ticketMachine: stopPoint.ticketMachine,
    reduced: stopPoint.reduced,
  }));
}
