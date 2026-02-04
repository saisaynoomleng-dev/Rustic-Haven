export const formatTitle = (title: string) => {
  return `${title.slice(0, 1).toUpperCase()}${title.slice(1)}`;
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'usd',
  }).format(price);
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateTime = (dateTime: string) => {
  return new Date(dateTime).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatUpperCase = (text: string) => {
  return `${text.toUpperCase()}`;
};
