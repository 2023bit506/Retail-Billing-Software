// bcryptHash.js
import bcrypt from "bcryptjs";

/**
 * Hash any string using bcrypt
 * @param {string} text - plain text to hash
 * @returns {Promise<string>} - hashed value
 */
export const hashString = async (text) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(text, salt);
    return hashed;
  } catch (err) {
    console.error("Hashing error:", err);
    throw err;
  }
};

// Run directly from terminal
// Example: node bcryptHash.js "mypassword"

if (process.argv[2]) {
  const input = process.argv[2];
  hashString(input).then(hash => {
    console.log("Input:", input);
    console.log("Bcrypt Hash:", hash);
  });
}
