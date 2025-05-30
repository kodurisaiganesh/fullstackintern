import React from "react";

export default function StoreCard({ store }) {
  return (
    <div className="store-card">
      <h3>{store.name}</h3>
      <p>{store.description || "No description available."}</p>
    </div>
  );
}
