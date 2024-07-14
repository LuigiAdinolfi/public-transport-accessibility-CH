import { ParkingLot } from "@/types/ParkingLot";

export function storeParkingLotToDB(parkingLots: ParkingLot[]): any[] {
  return parkingLots.map((parkingLot) => ({
    id: parkingLot.id.toString(),
    sloid: parkingLot.sloid,
    parentServicePointSloid: parkingLot.parentServicePointSloid,
    designation: parkingLot.designation,
    additionalInformation: parkingLot.additionalInformation,
    placesAvailable: parkingLot.placesAvailable,
    prmPlacesAvailable: parkingLot.prmPlacesAvailable,
  }));
}
