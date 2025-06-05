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
    setCurrentPage(1); // Reset to first page when filter changes
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
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search recalls..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when search changes
                }}
                className="bg-white/10 text-white placeholder-white/50 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition-all w-64"
              />
              <Search className="w-4 h-4 text-white/50 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              {(["All", "Ongoing", "Completed", "Terminated"] as const).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => handleFilterChange(status)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                      filter === status
                        ? "bg-white text-primary font-semibold"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg bg-white/5">
          {loading.table ? (
            <div className="p-4 text-center text-white/80 animate-pulse">
              Loading table data...
            </div>
          ) : (
            <>
              <table className="min-w-full text-sm text-left">
                <thead className="text-xs uppercase font-medium text-white/80">
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
                      className="border-t border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-5 py-3 text-white/90">
                        {drug.product_description}
                      </td>
                      <td className="px-5 py-3 text-white/90">
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
                      <td className="px-5 py-3 text-white/90">
                        {drug.reason_for_recall}
                      </td>
                      <td className="px-5 py-3 text-white/90">
                        {new Date(
                          drug.recall_initiation_date
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredData.length === 0 && (
                <div className="p-4 text-center text-white/80">
                  No recalls found matching your search criteria
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination Controls */}
        {filteredData.length > 0 && (
          <div className="flex items-center justify-between mt-4 px-2">
            <div className="text-sm text-white/80">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)}{" "}
              of {filteredData.length} results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? "text-white/30 cursor-not-allowed"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                        currentPage === page
                          ? "bg-white text-primary font-semibold"
                          : "text-white hover:bg-white/10"
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
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? "text-white/30 cursor-not-allowed"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentRecallTableComponent;
