export function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
  //output true/false
}

export function validatePhone(phone) {
  var result = false;
  if (phone[0] === '0' && phone.length > 8) result = true;
  return result;
}

export const validateInput = (type, value) => {
  if (!value) {
    return 'invalid';
  } else if (type === 'email') {
    if (!validateEmail(value)) return 'invalid';
  } else if (type === 'phone') {
    if (!validateEmail(value)) return 'invalid';
  }
};
