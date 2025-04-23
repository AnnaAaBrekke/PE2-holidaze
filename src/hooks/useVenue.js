import { useState, useEffect } from "react";
import apiFetch from "../utils/apiFetch";

const useVenue = (id) => {
  const [venue, setVenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const result = await apiFetch(`/venues/${id}?_bookings=true`);
        setVenue(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  return { venue, loading, error };
};

export default useVenue;
