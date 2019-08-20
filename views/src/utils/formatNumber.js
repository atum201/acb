const formatNumber = numberString => {
  const number = parseInt(numberString, 10);
  if (number < 10) return "0" + number;
  return numberString;
};

export default formatNumber;
