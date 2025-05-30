import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <Link to="/login" className="text-blue-600 underline">
        Go back to Login
      </Link>
    </div>
  );
}
