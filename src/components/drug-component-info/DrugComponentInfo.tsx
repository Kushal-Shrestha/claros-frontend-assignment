const DrugComponentInfo = () => {
  return (
    <div>
      {" "}
      <h2 className="text-2xl font-semibold text-text mb-6 border-b border-border pb-2">
        FDA Drug Data Dashboard
      </h2>
      {/* Description Section */}
      <div className="mb-8 bg-background p-4 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-text mb-2">
          About This Dashboard
        </h3>
        <p className="text-text-muted mb-2">
          This dashboard provides a comprehensive overview of drug-related data
          from the U.S. Food and Drug Administration (FDA). It combines three
          key data sources:
        </p>
        <ul className="list-disc list-inside text-text-muted space-y-1">
          <li>
            <strong>Drug Recalls:</strong> Information about drug products that
            have been recalled, including their status, reasons, and impact.
          </li>
          <li>
            <strong>Adverse Events:</strong> Reports of adverse reactions or
            side effects associated with drug products.
          </li>
          <li>
            <strong>Drug Labels:</strong> Official labeling information for drug
            products, including warnings and usage instructions.
          </li>
        </ul>
        <p className="text-text-muted mt-2">
          The dashboard aims to help healthcare professionals, researchers, and
          the public track drug safety issues, monitor ongoing recalls, and
          understand patterns in drug-related incidents.
        </p>
      </div>
    </div>
  );
};

export default DrugComponentInfo;
