import crypto from 'crypto';

export const passwordHashUtil = (plainPassword: string): string => {
  const salt: string = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(plainPassword, salt, 64).toString('hex');

  return `${salt}:${derivedKey}`;
};

export const comparePassword = (plainPassword: string, passwordHash: string): boolean => {
  const [salt, key] = passwordHash.split(":");
  const derivedKey = crypto.scryptSync(plainPassword, salt, 64).toString('hex');

  return key === derivedKey;
};
