// Format date to readable string
export const formatDate = (date, options = {}) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });
};

// Format time (HH:MM AM/PM)
export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Format number with commas
export const formatNumber = (num) => {
  return Number(num).toLocaleString();
};

// Format currency
export const formatCurrency = (num, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(num);
};
