import { useState, useEffect } from "react";
import apiFetch from "../utils/apiFetch";

const useVenue = (id) => {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVenue = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await apiFetch(`/venues/${id}?_bookings=true`);
      setVenue(result.data);
    } catch (error) {
      setError(error.message);
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
