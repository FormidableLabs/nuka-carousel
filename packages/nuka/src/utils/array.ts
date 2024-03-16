/**
 * Creates an zero based array of numbers each multiplied by initialValue
 * @param length The length of the array
 * @param initialValue The seed value that each element will be multiplied by
 * @returns An array of numbers
 */
export function arraySeq(length: number, initialValue: number): number[] {
  return new Array(length).fill(0).map((_, i) => i * initialValue);
}

/**
 * Creates an array where each element is the sum of all previous elements
 * @param values The seed array
 * @returns An array of numbers
 */
export function arraySum(values: number[]): number[] {
  let sum = 0;
  return values.map((value) => (sum += value));
}

/**
 * Finds the nearest number in an array to a target number
 * @returns A number
 */
export function nint(array: number[], target: number): number {
  return array.reduce((prev, curr) =>
    Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
  );
}
