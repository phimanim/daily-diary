import React from "react";

function Suspense({ noData, loading, error, children }) {
  if (noData) {
    return (
      <div>
        <p>No data</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <p>Loading ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  }

  return children;
}

export default Suspense;