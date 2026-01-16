// Capitalize first letter
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Generate random ID
export const generateId = () => Date.now().toString();

// Delay / sleep helper
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Truncate text with ellipsis
export const truncate = (text, max = 100) =>
  text.length > max ? text.slice(0, max) + "..." : text;
