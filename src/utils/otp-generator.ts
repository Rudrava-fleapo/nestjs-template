import { randomInt } from 'node:crypto';

/**
 * Generate OTP
 */
export const OTPGenerator = (): string => {
  if (['local', 'staging'].includes(process.env.NODE_ENV as string))
    return '123456';

  const length = 6;

  const allowsChars = '0123456789';
  let otp = '';
  while (otp.length < length) {
    const charIndex = randomInt(0, allowsChars.length);
    if (otp.length === 0 && allowsChars[charIndex] === '0') {
      continue;
    }
    otp += allowsChars[charIndex];
  }
  return otp;
};
