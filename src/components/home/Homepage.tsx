const Homepage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-text mb-6">
        Welcome to Analytics Dashboard
      </h1>
      <div className="bg-background-light rounded-lg shadow p-6 border border-border">
        <p className="text-text-muted">
          This is your analytics dashboard. Use the navigation bar above to
          explore different sections.
        </p>
      </div>
    </div>
  );
};

export default Homepage;
