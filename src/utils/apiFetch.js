import { API_URL, API_HEADERS } from "../../constants";

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
    ...(body &&
      method !== "GET" &&
      method !== "DELETE" && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, options);

    if (response.status === 204) return true;

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
