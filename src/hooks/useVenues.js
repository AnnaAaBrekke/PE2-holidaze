import { useState, useEffect } from "react";
import apiFetch from "../utils/apiFetch";

const useVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVenues = async () => {
      try {
        const result = await apiFetch("/venues");
        setVenues(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadVenues();
  }, []);

  return { venues, loading, error };
};

export default useVenues;
