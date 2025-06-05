import { Pill, Info, Search } from "lucide-react";

const Homepage = () => {
  return (
    <div className="container mx-auto">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-text mb-4">
        Welcome to the FDA Drug Recall Dashboard
      </h1>

      {/* Introduction */}
      <div className="bg-background-light rounded-lg shadow p-6 border border-border mb-8">
        <p className="text-text-muted text-base leading-relaxed">
          This dashboard offers an interactive way to explore drug recall and
          enforcement data provided by the U.S. Food and Drug Administration
          (FDA). Track recall patterns, analyze affected products, and gain
          insights into current drug-related public health alerts. Navigate
          through the{" "}
          <span className="font-medium text-primary">Drug Analytics</span>{" "}
          section for charts and tables, and refer to the{" "}
          <span className="font-medium text-primary">System Info</span> section
          for details on data sources and usage.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Drug Analytics */}
        <div className="bg-background-light rounded-lg shadow p-6 border border-border hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-primary/10 rounded-lg">
              <Pill className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text">Drug Analytics</h3>
          </div>
          <p className="text-text-muted">
            Dive into visual data breakdowns including recall status, recall
            counts by manufacturer, and trends over time. Stay informed with
            real-time analytics pulled directly from FDA's public APIs.
          </p>
        </div>

        {/* Search & Filter Tools */}
        <div className="bg-background-light rounded-lg shadow p-6 border border-border hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-primary/10 rounded-lg">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text">Search & Filter</h3>
          </div>
          <p className="text-text-muted">
            Use built-in search and filtering features to narrow down recalls by
            status, date, product description, or manufacturer. Quickly locate
            specific drug events using keyword-based queries.
          </p>
        </div>

        {/* System Info */}
        <div className="bg-background-light rounded-lg shadow p-6 border border-border hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-primary/10 rounded-lg">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-text">
              System Information
            </h3>
          </div>
          <p className="text-text-muted">
            Learn more about how the data is sourced from openFDA, how often
            it's updated, and how to interpret the charts and tables in this
            dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
