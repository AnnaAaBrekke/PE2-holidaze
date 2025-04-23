import apiFetch from "../utils/apiFetch";

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
    throw error;
  }
};

export default updateProfile;
