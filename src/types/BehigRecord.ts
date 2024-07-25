/**
 * Interface for the BehigRecord object
 */
export interface BehigRecord {
  sloid: string;
  bezeichnung_offiziell: string;
  ortschaftsname: string;
  gemeindename: string;
  bpvh_verkehrsmittel_text_de: string;
  height: number;
  inclination: string;
  superelevation: number;
  zipcode: number;
  assistanceavailability: string;
  assistancecondition: string;
  assistanceservice: string;
  audioticketmachine: string;
  additionalinformation: string;
  dynamicaudiosystem: string;
  dynamicopticsystem: string;
  freetext: string;
  infoticketmachine: string;
  interoperable: string;
  assistancerequestfulfilled: string;
  visualinfo: string;
  wheelchairticketmachine: string;
  parentsloid: string;
  trafficpointelementtype: string;
  kanten_sloid: string;
  boardingdevice: string;
  adviceaccessinfo: string;
  contrastingareas: string;
  dynamicaudio: string;
  dynamicvisual: string;
  inclinationlongitudinal: string;
  inclinationwidth: number;
  infoopportunities: string[];
  levelaccesswheelchair: string;
  partialelevation: string;
  tactilesystems: string;
  vehicleaccess: string;
  wheelchairarealength: number;
  wheelchairareawidth: number;
  berechnete_availability: string;
  berechnet_personalverfugbarkeit: string;
  assistance_availablity_calculated: string;
  vehicle_access_calculated: string;
  assistance_service_calculated: string;
  level_access_wheelchair_calculated: string;
  haltekante_access_gerechnet: string;
  distanz_haltestelle_haltekante: number;
  shuttle: string;
  // Add other necessary fields
}
