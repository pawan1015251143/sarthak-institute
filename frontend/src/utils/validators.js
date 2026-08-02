// Form validation rules

export const validateRequired = (val) => {
  if (!val || val.toString().trim() === '') return "This field is required";
  return null;
};

export const validateMobile = (mobile) => {
  if (!mobile) return "Mobile number is required";
  const regex = /^[6-9]\d{9}$/;
  if (!regex.test(mobile)) return "Enter a valid 10-digit Indian mobile number";
  return null;
};

export const validateEmail = (email) => {
  if (!email) return "Email is required";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "Enter a valid email address";
  return null;
};

export const validateAadhaar = (aadhaar) => {
  if (!aadhaar) return "Aadhaar number is required";
  const regex = /^\d{4}[\s-]?\d{4}[\s-]?\d{4}$/;
  if (!regex.test(aadhaar)) return "Enter a valid 12-digit Aadhaar number";
  return null;
};
