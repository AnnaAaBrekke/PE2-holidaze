import apiFetch from "../utils/apiFetch";

export const createBooking = async ({
  dateFrom,
  dateTo,
  guests,
  venueId,
  token,
}) => {
  try {
    console.log("Sending booking data:", { dateFrom, dateTo, guests, venueId });

    return await apiFetch("/bookings", {
      method: "POST",
      token,
      body: {
        dateFrom,
        dateTo,
        guests,
        venueId,
      },
    });
  } catch (error) {
    console.error("Error creating booking", error.message);
    throw error;
  }
};

export const getUserBookings = async (name, token) => {
  try {
    return await apiFetch(`/profiles/${name}/bookings?_venue=true`, {
      method: "GET",
      token,
    });
  } catch (error) {
    console.error("Error fetching user bookings:", error.message);
    throw error;
  }
};
