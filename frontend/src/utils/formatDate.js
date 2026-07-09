export const formatDate = (dateStr, options = {}) => {
  if (!dateStr) return '';
  const defaults = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-US', { ...defaults, ...options });
};

export const truncate = (text, maxLength = 150) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
