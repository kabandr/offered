import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import getOffers from "../services/getOffers";

function useOffers({ location, tabName, tagName, username }) {
  const [{ offers, offersCount }, setOffersData] = useState({
    offers: [],
    offersCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const { headers } = useAuth();

  useEffect(() => {
    if (!headers && tabName === "feed") return;

    setLoading(true);

    getOffers({ headers, location, tabName, tagName, username })
      .then(setOffersData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [headers, location, tabName, tagName, username]);

  return { offers, offersCount, loading, setOffersData };
}

export default useOffers;
