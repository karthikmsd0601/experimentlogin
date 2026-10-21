// ============================================================
//  src/utils/validators.js
//  All validation logic — reusable across the app
// ============================================================

export const Validators = {
  required: (val) => val.trim().length > 0,
  email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
  minLength: (n) => (val) => val.length >= n,
  maxLength: (n) => (val) => val.length <= n,
  noSpaces: (val) => !/\s/.test(val),
  phone: (val) => /^\+?[\d\s\-().]{7,15}$/.test(val.trim()),
  passwordStrength: (val) => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  },
};

export function getPasswordStrengthLabel(score) {
  if (score === 0) return { label: '', cls: '' };
  if (score === 1) return { label: 'Weak', cls: 'weak' };
  if (score === 2) return { label: 'Fair', cls: 'fair' };
  if (score === 3) return { label: 'Good', cls: 'good' };
  return { label: 'Strong', cls: 'strong' };
}

export function validateLoginForm(fields) {
  const errors = {};
  if (!Validators.required(fields.email)) {
    errors.email = 'Email address is required.';
  } else if (!Validators.email(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!Validators.required(fields.password)) {
    errors.password = 'Password is required.';
  } else if (!Validators.minLength(6)(fields.password)) {
    errors.password = 'Password must be at least 6 characters.';
  }
  return errors;
}

export function validateSignUpForm(fields) {
  const errors = {};
  if (!Validators.required(fields.firstName)) {
    errors.firstName = 'First name is required.';
  } else if (!Validators.minLength(2)(fields.firstName.trim())) {
    errors.firstName = 'First name must be at least 2 characters.';
  }
  if (!Validators.required(fields.lastName)) {
    errors.lastName = 'Last name is required.';
  } else if (!Validators.minLength(2)(fields.lastName.trim())) {
    errors.lastName = 'Last name must be at least 2 characters.';
  }
  if (!Validators.required(fields.email)) {
    errors.email = 'Email address is required.';
  } else if (!Validators.email(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (fields.phone && fields.phone.trim() && !Validators.phone(fields.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!Validators.required(fields.password)) {
    errors.password = 'Password is required.';
  } else if (!Validators.minLength(8)(fields.password)) {
    errors.password = 'Password must be at least 8 characters.';
  } else if (Validators.passwordStrength(fields.password) < 2) {
    errors.password = 'Password is too weak. Add uppercase, numbers or symbols.';
  }
  if (!Validators.required(fields.confirmPassword)) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }
  if (!fields.agreed) {
    errors.agreed = 'You must accept the Terms & Privacy Policy.';
  }
  return errors;
}
