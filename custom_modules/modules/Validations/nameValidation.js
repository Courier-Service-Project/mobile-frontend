const validateName = (firstName, lastName) => {
    console.log(firstName)
    console.log(lastName)
    const checkAlphabetic = /^[A-Za-z]+$/;
  
    if (!firstName) {
      return 'First name is empty';
    } else if (/\s/.test(firstName)) {
      return 'First name must not contain spaces';
    } else if (!checkAlphabetic.test(firstName)) {
      return 'First name must contain only alphabetic characters';
    } else if (firstName.length < 2) {
      return 'First name must contain at least 2 characters';
    }
  
    if (!lastName) {
      return 'Last name is empty';
    } else if (/\s/.test(lastName)) {
      return 'Last name must not contain spaces';
    } else if (!checkAlphabetic.test(lastName)) {
      return 'Last name must contain only alphabetic characters';
    } else if (lastName.length < 2) {
      return 'Last name must contain at least 2 characters';
    }
  
    return true;
  };
  
  export default validateName;
  