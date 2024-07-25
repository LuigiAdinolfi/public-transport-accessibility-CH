/**
 * Interface for ParkingLot
 */
export interface ParkingLot {
  id: string;
  sloid: string;
  parentServicePointSloid: string;
  designation: string;
  additionalInformation: string;
  placesAvailable: string;
  prmPlacesAvailable: string;
}
