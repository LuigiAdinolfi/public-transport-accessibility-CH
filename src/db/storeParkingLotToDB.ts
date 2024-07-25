import { ParkingLot } from "@/types/ParkingLot";

/**
 * Converts an array of `ParkingLot` objects into a format suitable for storage in a database.
 * This function maps each `ParkingLot` object to a new object with transformed properties.
 *
 * @param {ParkingLot[]} parkingLots - An array of `ParkingLot` objects to be converted.
 * @returns {any[]} - An array of objects formatted for database storage.
 */
export function storeParkingLotToDB(parkingLots: ParkingLot[]): any[] {
  // Map each ParkingLot object to a new format suitable for database storage
  return parkingLots.map((parkingLot) => ({
    id: parkingLot.id ? parkingLot.id.toString() : "",
    sloid: parkingLot.sloid,
    parentServicePointSloid: parkingLot.parentServicePointSloid,
    designation: parkingLot.designation,
    additionalInformation: parkingLot.additionalInformation,
    placesAvailable: parkingLot.placesAvailable,
    prmPlacesAvailable: parkingLot.prmPlacesAvailable,
  }));
}
