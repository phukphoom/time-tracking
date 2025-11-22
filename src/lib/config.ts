export const hashSalt = parseInt(process.env.HASH_SALT || "10", 10);
export const jwtSecret =
  process.env.JWT_SECRET || "fallback-secret-change-in-production";
