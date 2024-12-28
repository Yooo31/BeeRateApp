import { API_URL } from "@/config/api";
import { Beer } from "@/types/beer";
import { useEffect, useState } from "react";

export const useBeers = () => {
  const [data, setData] = useState<Beer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/beers`);

        if (!response.ok) {
          throw new Error("Erreur de réseau");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur inconnue s'est produite");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
