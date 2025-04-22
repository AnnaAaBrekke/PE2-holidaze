import { API_HEADERS, API_URL } from "../../constants";

const updateProfile = async (formData) => {
  const { name, url, alt, bio, token } = formData;

  try {
    console.log("FormData sent to API:", formData);

    const response = await fetch(`${API_URL}/profiles/${name}`, {
      method: "PUT",
      headers: {
        ...API_HEADERS,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: {
          url,
          alt,
        },
        bio,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Updating Profile Failed");
    }

    return result;
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
};

export default updateProfile;
