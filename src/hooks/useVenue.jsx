/**
 * Custom React hook for fetching detailed information about a single venue.
 *
 * @param {string} id - The ID of the venue to fetch.
 * @returns {Object} An object containing:
 * - venue {Object|null}: The fetched venue data (includes owner and bookings).
 * - loading {boolean}: Whether the data is currently being fetched.
 * - error {string}: Error message if the fetch fails.
 * - refetch {Function}: Function to manually re-fetch the venue data.
 */

import { useState, useEffect } from "react";
import apiFetch from "../utils/apiFetch";
import { friendlyError } from "../utils/errorMessages";

const useVenue = (id) => {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVenue = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await apiFetch(`/venues/${id}?_owner=true&_bookings=true`);
      setVenue(result.data);
    } catch (error) {
      setError(friendlyError(error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenue();
  }, [id]);

  return { venue, loading, error, refetch: fetchVenue };
};

export default useVenue;
