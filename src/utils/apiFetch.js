import { API_URL, API_HEADERS } from "../../constants"; // Assuming API_URL is the default

const apiFetch = async (
  endpoint,
  {
    method = "GET",
    body,
    token,
    customHeaders = {},
    skipDefaultHeaders = false,
    baseUrl = API_URL,
  } = {},
) => {
  const headers = {
    ...(skipDefaultHeaders ? {} : API_HEADERS),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...customHeaders,
  };

  const options = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `Request failed: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error(`[apiFetch][${method} ${endpoint}]`, error.message);
    throw error;
  }
};

export default apiFetch;
