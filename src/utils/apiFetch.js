import { API_BASE_URL, API_HEADERS } from "../../constants";

const apiFetch = async (
  endpoint,
  {
    method = "GET",
    body,
    token,
    customHeaders = {},
    skipDefaultHeaders = false,
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
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `Request failed: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error(`[apiFetch][${method} ${endpoint}]`, err.message);
    throw error;
  }
};

export default apiFetch;
