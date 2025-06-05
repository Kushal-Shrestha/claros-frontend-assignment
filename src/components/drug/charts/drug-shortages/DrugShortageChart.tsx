import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertTriangle, Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { AppDispatch, RootState } from "../../../../redux/store";
import {
  fetchDrugShortages,
  setFilter,
} from "../../../../redux/drugShortageSlice";
import { COLORS } from "../../../../../theme";

interface DrugShortageData {
  term: string;
  count: number;
}

const DrugShortageChart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, filter } = useSelector(
    (state: RootState) => state.drugShortages
  );

  useEffect(() => {
    dispatch(fetchDrugShortages(filter));
  }, [dispatch, filter]);

  const handleFilterChange = (newFilter: string) => {
    dispatch(setFilter(newFilter));
  };

  if (error) {
    return (
      <div className="bg-primary rounded-xl p-6 shadow-sm border border-primary/20">
        <div className="text-red-300 text-center">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-primary rounded-xl p-6 shadow-sm border border-primary/20 hover:shadow-lg transition-all duration-300 hover:border-primary/30 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 group-hover:bg-white/10 transition-colors duration-300"></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-6 max-md:flex-col max-md:justify-between max-md:items-center max-md:gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Drug Shortages by Therapeutic Category
            </h3>
          </div>

          {/* Radio Button Filter */}
          <div className="flex items-center gap-4 max-md:flex-col max-md:justify-start max-md:items-start max-md:w-full">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-primary"
                name="availability"
                value="all"
                checked={filter === "all"}
                onChange={(e) => handleFilterChange(e.target.value)}
                disabled={loading}
              />
              <span className="ml-2 text-white">All Products</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-primary"
                name="availability"
                value="unavailable"
                checked={filter === "unavailable"}
                onChange={(e) => handleFilterChange(e.target.value)}
                disabled={loading}
              />
              <span className="ml-2 text-white">Unavailable</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-primary"
                name="availability"
                value="limited"
                checked={filter === "limited"}
                onChange={(e) => handleFilterChange(e.target.value)}
                disabled={loading}
              />
              <span className="ml-2 text-white">Limited Availability</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-primary"
                name="availability"
                value="available"
                checked={filter === "available"}
                onChange={(e) => handleFilterChange(e.target.value)}
                disabled={loading}
              />
              <span className="ml-2 text-white">Available</span>
            </label>
          </div>
        </div>
        <div className="h-[600px] bg-white/5 rounded-lg p-4 relative">
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
                <span className="text-white text-sm">Loading data...</span>
              </div>
            </div>
          )}

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 100,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{
                  fill: "rgba(255, 255, 255, 0.8)",
                  fontSize: 12,
                }}
              />
              <YAxis
                type="category"
                dataKey="term"
                tick={{
                  fill: "rgba(255, 255, 255, 0.8)",
                  fontSize: 12,
                }}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => [`${value} shortages`, "Count"]}
              />
              <Bar
                dataKey="count"
                fill="#8884d8"
                name="Number of Shortages"
                radius={[0, 4, 4, 0]}
                maxBarSize={50}
              >
                {data.map((_: DrugShortageData, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DrugShortageChart;
