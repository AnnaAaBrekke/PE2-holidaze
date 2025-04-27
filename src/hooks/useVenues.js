import { useState, useEffect } from "react";
import apiFetch from "../utils/apiFetch";
import { friendlyError } from "../utils/errorMessages";

const useVenues = (
  page = 1,
  limit = 12,
  sort = "created",
  sortOrder = "desc",
) => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const result = await apiFetch(
          `/venues?limit=${limit}&page=${page}&sort=${sort}&sortOrder=${sortOrder}`,
        );
        setVenues(result.data);
      } catch (error) {
        setError(friendlyError(error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [page, limit, sort, sortOrder]);

  return { venues, loading, error };
};

export default useVenues;
