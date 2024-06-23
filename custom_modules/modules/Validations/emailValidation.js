const validateEmail = (email) => {
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is empty';
    } else if (!checkEmail.test(email)) {
      return 'Email is not valid';
    }
    return true;
  };

  export default validateEmail;