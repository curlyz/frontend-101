/**
 * Creates an artificial delay for a specified number of milliseconds.
 * Useful for simulating network latency or making UI changes more noticeable.
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export const artificialDelay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
