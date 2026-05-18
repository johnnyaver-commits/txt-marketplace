import argon2 from 'argon2';

function withPepper(password: string, pepper: string) {
  return `${password}.${pepper}`;
}

export async function hashPassword(password: string, pepper: string) {
  return argon2.hash(withPepper(password, pepper), { type: argon2.argon2id });
}

export async function verifyPassword(hash: string, password: string, pepper: string) {
  try {
    return await argon2.verify(hash, withPepper(password, pepper));
  } catch {
    return false;
  }
}
