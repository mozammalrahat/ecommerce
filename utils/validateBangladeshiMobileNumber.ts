export const validateBangladeshiMobileNumber = (mobileNumber: string) => {
  const regex = /^(\+)?(88)?01[0-9]{9}$/;
  return regex.test(mobileNumber);
};
