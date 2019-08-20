export function validateNumber(phone) {
  var pattern = /^\d{0,2}$/;
  return pattern.test(phone);
}
export function validateNumberBonus(phone) {
  var pattern = /^\d{0,15}$/;
  return pattern.test(phone);
}
export function validateNumberQuestion(phone) {
  var pattern = /^(1|2|3|4|5|6|7|8|9|10){0,1}$/;
  return pattern.test(phone);
}
