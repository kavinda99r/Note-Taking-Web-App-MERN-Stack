const { randomBytes, scrypt, timingSafeEqual, createHash } = require("node:crypto");
const { promisify } = require("node:util");
const deriveKey = promisify(scrypt);
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const key = await deriveKey(password, salt, 64);
  return `scrypt$${salt}$${key.toString("hex")}`;
}
async function verifyPassword(password, stored) {
  if (typeof password !== "string" || typeof stored !== "string" || Buffer.byteLength(password) > 1024) return false;
  if (stored.startsWith("scrypt$")) {
    const [, salt, encoded] = stored.split("$");
    if (!/^[a-f0-9]{32}$/.test(salt || "") || !/^[a-f0-9]{128}$/.test(encoded || "")) return false;
    const key = await deriveKey(password, salt, 64);
    return timingSafeEqual(key, Buffer.from(encoded, "hex"));
  }
  // Existing accounts remain usable until their legacy password is changed.
  const digest = (value) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(password), digest(stored));
}
module.exports = { hashPassword, verifyPassword };
