export interface accessProps {
  icon: any;
  text: string;
  score: number;
}

/**
 * Interface for access icon properties.
 */

export interface accessIconProps {
  origin: accessProps | null;
  destination: accessProps | null;
}
