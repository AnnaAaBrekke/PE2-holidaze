/**
 * Venue API functions.
 *
 * @param {Object} venueData - Data for creating or updating a venue.
 * @param {string} token - Bearer token for authentication.
 * @param {string} id - Venue ID (for update/delete).
 * @param {string} name - Manager profile name (for getManagerVenues).
 *
 */

import apiFetch from "../utils/apiFetch";

export const createVenue = async (venueData, token) => {
  return await apiFetch("/venues", {
    method: "POST",
    token,
    body: venueData,
  });
};

export const updateVenue = async (id, venueData, token) => {
  return await apiFetch(`/venues/${id}`, {
    method: "PUT",
    token,
    body: venueData,
  });
};

export const deleteVenue = async (id, token) => {
  return await apiFetch(`/venues/${id}`, {
    method: "DELETE",
    token,
  });
};

export const getManagerVenues = async (name, token) => {
  return await apiFetch(
    `/profiles/${name}/venues?_owner=true&_bookings=true&_customer=true`,
    {
      method: "GET",
      token,
    },
  );
};
