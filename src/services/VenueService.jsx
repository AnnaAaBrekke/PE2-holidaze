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
  return await apiFetch(`/profiles/${name}/venues?_owner=true&_bookings=true`, {
    method: "GET",
    token,
  });
};
