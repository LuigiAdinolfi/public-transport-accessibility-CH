import * as OJP from "ojp-sdk";

export function isTripTimedLeg(leg: OJP.TripLeg): leg is OJP.TripTimedLeg {
  return (leg as OJP.TripTimedLeg).fromStopPoint !== undefined;
}

export function formatTime(date: Date | null): string {
  if (!date) return 'N/A';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

