/**
 * Custom React hook for fetching a list of venues.
 *
 * @returns {Object} An object containing:
 * - venues {Array}: List of fetched venues.
 * - loading {boolean}: Indicates if the data is currently being loaded.
 * - error {string}: Error message if the fetch fails.
 */

import { useState, useEffect } from "react";
import apiFetch from "../utils/apiFetch";
import { friendlyError } from "../utils/errorMessages";

const useVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const result = await apiFetch(
          `/venues?limit=100&sort=created&sortOrder=desc`,
        );
        setVenues(result.data);
      } catch (error) {
        setError(friendlyError(error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  return { venues, loading, error };
};

export default useVenues;
