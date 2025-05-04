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
        // Fetch all venues (e.g., 1000 at once, or whatever your API allows)
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
