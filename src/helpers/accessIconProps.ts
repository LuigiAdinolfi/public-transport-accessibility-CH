/**
 * Interface representing properties for access features.
 * This interface is used to describe the attributes of access-related items, including an icon, descriptive text, and a score.
 *
 * @interface accessProps
 */
export interface accessProps {
  /**
   * The icon representing the access feature.
   * @type {any}
   */
  icon: any;

  /**
   * Descriptive text for the access feature.
   * @type {string}
   */
  text: string;

  /**
   * Score or rating associated with the access feature.
   * @type {number}
   */
  score: number;
}

/**
 * Interface representing access icon properties for both origin and destination.
 * This interface describes the access features for two points: the origin and destination.
 *
 * @interface accessIconProps
 */
export interface accessIconProps {
  /**
   * Access properties for the origin point.
   * This can be null if no access properties are available for the origin.
   * @type {accessProps | null}
   */
  origin: accessProps | null;

  /**
   * Access properties for the destination point.
   * This can be null if no access properties are available for the destination.
   * @type {accessProps | null}
   */
  destination: accessProps | null;
}
