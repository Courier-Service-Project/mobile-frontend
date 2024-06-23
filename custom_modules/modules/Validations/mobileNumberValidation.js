const validatePhoneNumber = phoneNumber => {
  // Regex to match Sri Lankan mobile numbers starting with 07 and followed by 8 digits
  const checkPhone = /^07\d{8}$/;

  if (!phoneNumber) {
    return 'Phone number is empty';
  } else if (!checkPhone.test(phoneNumber)) {
    return 'Phone number must be a valid Sri Lankan mobile number';
  }

  return true;
};

export default validatePhoneNumber;
