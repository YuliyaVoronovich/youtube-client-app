export function getPasswordStrengthError(password: string): string {
  if (password.length < 8) {
    return 'Use at least 8 characters';
  }

  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
    return 'Include a mixture of uppercase and lowercase letters';
  }

  if (!/[a-zA-Z]+.*\d+|\d+.*[a-zA-Z]+/.test(password)) {
    return 'Include a mixture of letters and numbers';
  }

  if (!/[!@#$%^&*()\-_=+{};:,<.>/?[\]\\|`~]/.test(password)) {
    return 'Include at least one special character (! @ # ?)';
  }

  return '';
}
