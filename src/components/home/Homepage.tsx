import React from "react";

const Homepage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Welcome to Analytics Dashboard
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          This is your analytics dashboard. Use the navigation bar above to
          explore different sections.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
