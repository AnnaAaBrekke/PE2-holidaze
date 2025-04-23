// import { useState, useEffect } from "react";
// import apiFetch from "../utils/apiFetch";

// const useVenueBookings = (id) => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const result = await apiFetch(`/bookings?_venue=true`);
//         const filteredBookings = result.data.filter(
//           (booking) => booking.venue?.id === id,
//         );

//         setBookings(filteredBookings);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [id]);

//   return { bookings, loading, error };
// };

// export default useVenueBookings;
