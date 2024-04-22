export const sanitizePhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) return '';
  const sanitizedNumber = phoneNumber.replace(/[^0-9.]/gi, '');
  return `+${sanitizedNumber}`;
};
