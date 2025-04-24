import apiFetch from "../utils/apiFetch";

const createBooking = async ({ dateFrom, dateTo, guests, venueId, token }) => {
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

export default createBooking;
