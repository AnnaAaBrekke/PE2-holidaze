/**
 * Performs an HTTP request to a specified API endpoint with support for
 * configurable methods, headers, and body payloads.
 *
 * @function
 * @async
 * @param {string} endpoint - The API endpoint (appended to the base URL).
 * @param {Object} [options] - Optional settings for the request.
 * @param {string} [options.method="GET"] - HTTP method to use (e.g., "GET", "POST").
 * @param {Object} [options.body] - The request payload (for methods like POST or PUT).
 * @param {string} [options.token] - Bearer token for Authorization header.
 * @param {Object} [options.customHeaders={}] - Additional headers to include.
 * @param {boolean} [options.skipDefaultHeaders=false] - If true, omit default headers.
 * @param {string} [options.baseUrl=API_URL] - Base URL for the API.
 * @returns {Promise<Object|boolean>} The response JSON, or true if status is 204 (No Content).
 * @throws Will throw an error if the request fails or returns a non-OK response.
 */

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
