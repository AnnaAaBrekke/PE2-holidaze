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
