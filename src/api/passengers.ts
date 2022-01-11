export const getPassengersData = (page = 0) => {
  const size = 10;
  return `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`;
};
