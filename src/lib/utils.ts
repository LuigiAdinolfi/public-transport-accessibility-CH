import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class strings or objects into a single class string,
 * merging Tailwind CSS classes using the `twMerge` function and standard classes using `clsx`.
 *
 * @param inputs - The class strings or objects to be combined.
 * @returns A single string containing the merged classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
