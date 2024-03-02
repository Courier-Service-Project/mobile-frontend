import {Alert} from 'react-native';

const validatePaasword = password => {
  const checkDigits = /\d/;
  const checkUpperCase = /[A-Z]/;
  const checkLowerCase = /[a-z]/;
  const specialCharacter = /[^A-Za-z0-9]/;

  if (!checkDigits.test(password)) {
    return ('Password must have atleast one digit');
  } else if (!checkUpperCase.test(password) || !checkLowerCase.test(password)) {
    return ('Password must have atleast one UpperCase or LowerCase letter');
  } else if (!specialCharacter.test(password)) {
    return ('Password must have atleast one special character') ;
  } else if (password.length < 8) {
    return ('password must contain at least 8 characters');
  }
  return true;
};

export default validatePaasword;
