/**
 * Booking API functions.
 *
 * @function createBooking
 * @param {Object} bookingData - Data for the new booking.
 * @param {string} bookingData.dateFrom - Start date of the booking (ISO string).
 * @param {string} bookingData.dateTo - End date of the booking (ISO string).
 * @param {number} bookingData.guests - Number of guests.
 * @param {string} bookingData.venueId - ID of the venue being booked.
 * @param {string} bookingData.token - Bearer token for authentication.
 * @returns {Promise<Object>} The created booking data.
 *
 * @function getUserBookings
 * @param {string} name - Profile name of the user.
 * @param {string} token - Bearer token for authentication.
 * @returns {Promise<Object[]>} List of the user's bookings with venue details.
 */

import apiFetch from "../utils/apiFetch";
import { friendlyError } from "../utils/errorMessages";

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
    throw new Error(friendlyError(error.message));
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
    throw new Error(friendlyError(error.message));
  }
};
