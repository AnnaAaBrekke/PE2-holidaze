/**
 * Updates a user profile with new avatar and bio information.
 *
 * @param {Object} formData - Data used to update the profile.
 * @param {string} formData.name - The profile name to update.
 * @param {string} formData.url - URL of the new avatar image.
 * @param {string} formData.alt - Alt text for the avatar image.
 * @param {string} formData.bio - User biography text.
 * @param {string} formData.token - Bearer token for authentication.
 * @returns {Promise<Object>} The updated profile data.
 * @throws {Error} Throws a user-friendly error if the update fails.
 */

import apiFetch from "../utils/apiFetch";
import { friendlyError } from "../utils/errorMessages";

const updateProfile = async (formData) => {
  const { name, url, alt, bio, token } = formData;

  try {
    return await apiFetch(`/profiles/${name}`, {
      method: "PUT",
      token,
      body: {
        avatar: {
          url,
          alt,
        },
        bio,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw new Error(friendlyError(error.message));
  }
};

export default updateProfile;
