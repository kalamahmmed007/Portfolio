// Format date in YYYY-MM-DD
export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB"); // DD/MM/YYYY
};

// Capitalize first letter
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
