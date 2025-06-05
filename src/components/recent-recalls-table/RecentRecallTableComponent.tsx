import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import type { RootState } from "../../redux/store";
import { AlertTriangle, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { setFilter, type RecallStatus } from "../../redux/drugSlice";
import type { AppDispatch } from "../../redux/store";

const ITEMS_PER_PAGE = 10;

const RecentRecallTableComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, filter, loading } = useSelector(
    (state: RootState) => state.drugs
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (newFilter: RecallStatus) => {
    dispatch(setFilter(newFilter));
    setCurrentPage(1);
  };

  // Client-side filtering
  const filteredData = useMemo(() => {
    return data.enforcement.filter((drug: any) => {
      const matchesSearch =
        searchTerm === "" ||
        drug.product_description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        drug.recall_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.reason_for_recall.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = filter === "All" || drug.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [data.enforcement, searchTerm, filter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="bg-primary rounded-xl p-6 shadow-sm border border-primary/20 hover:shadow-lg transition-all duration-300 hover:border-primary/30 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 group-hover:bg-white/10 transition-colors duration-300"></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Recent Drug Recalls
            </h3>
          </div>

          {/* Search and Filter Section */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search recalls..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when search changes
                }}
                className="pl-10 pr-4 py-2 bg-background-light border border-border rounded-lg text-text placeholder-text-muted focus:outline-none focus:border-accent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {["All", "Ongoing", "Terminated"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleFilterChange(status as RecallStatus)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? "bg-accent text-white"
                      : "bg-background-light text-text-muted hover:bg-background-lighter"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg bg-background-light">
          {loading.table ? (
            <div className="p-4 text-center text-text-muted animate-pulse">
              Loading table data...
            </div>
          ) : (
            <>
              <table className="min-w-full text-sm text-left">
                <thead className="text-xs uppercase font-medium text-text-muted">
                  <tr>
                    <th className="px-5 py-3">Drug Name</th>
                    <th className="px-5 py-3">Recall Number</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Reason</th>
                    <th className="px-5 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((drug: any, index: number) => (
                    <tr
                      key={index}
                      className="border-t border-border hover:bg-background-lighter transition-colors"
                    >
                      <td className="px-5 py-3 text-text">
                        {drug.product_description}
                      </td>
                      <td className="px-5 py-3 text-text">
                        {drug.recall_number}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-semibold ${
                            drug.status === "Ongoing"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : drug.status === "Terminated"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-gray-500/20 text-gray-300"
                          }`}
                        >
                          {drug.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-text">
                        {drug.reason_for_recall}
                      </td>
                      <td className="px-5 py-3 text-text">
                        {new Date(
                          drug.recall_initiation_date
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredData.length === 0 && (
                <div className="p-4 text-center text-text-muted">
                  No recalls found matching your search criteria
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-text-muted">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredData.length)} of {filteredData.length}{" "}
              entries
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-background-light text-text-muted hover:bg-background-lighter disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                        currentPage === page
                          ? "bg-accent text-white font-semibold"
                          : "bg-background-light text-text-muted hover:bg-background-lighter"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-background-light text-text-muted hover:bg-background-lighter disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentRecallTableComponent;
