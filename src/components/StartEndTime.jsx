export const formatTime = (dateString) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `  ${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
};
