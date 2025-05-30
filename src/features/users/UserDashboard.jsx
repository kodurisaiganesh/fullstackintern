import React, { useEffect, useState } from "react";
import { fetchStores } from "../services/api";
import StoreCard from "../../components/StoreCard";

export default function UserDashboard() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function loadStores() {
      const res = await fetchStores();
      setStores(res.data);
    }
    loadStores();
  }, []);

  return (
    <div>
      <h2>Stores List</h2>
      {stores.length === 0 && <p>No stores available</p>}
      <div>
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
}
