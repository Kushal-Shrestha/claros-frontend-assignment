import { Activity } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { COLORS } from "../../../../../theme";
import { RECALL_STATUS_DESCRIPTIONS } from "../../../../../rawdata";

const RecallStatusDistributionComponent = () => {
  const { unfilteredData } = useSelector((state: RootState) => state.drugs);

  const prepareRecallByStatusData = () => {
    const statusCounts: Record<string, number> = {};
    unfilteredData.enforcement.forEach((item: any) => {
      statusCounts[item.status] = (statusCounts[item.status] || 0) + 1;
    });
    return Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  return (
    <div className="bg-primary rounded-xl p-6 shadow-sm border border-primary/20 hover:shadow-lg transition-all duration-300 hover:border-primary/30 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 group-hover:bg-white/10 transition-colors duration-300"></div>
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">
            Recall Status Distribution
          </h3>
        </div>
        <div className="h-[300px] bg-white/5 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={prepareRecallByStatusData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {prepareRecallByStatusData().map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-6 h-[calc(100%-300px)]">
          {prepareRecallByStatusData().map((item, index) => (
            <div
              key={item.name}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors duration-300 border border-white/10 hover:border-white/20"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
                <span className="text-sm font-medium text-white">
                  {item.name}
                </span>
              </div>
              <div className="mt-1">
                <span className="text-lg font-semibold text-white">
                  {item.value}
                </span>
                <span className="text-sm text-white/60 ml-1">recalls</span>
              </div>
              <div className="mt-2">
                <p className="text-xs text-white/70 leading-relaxed">
                  {RECALL_STATUS_DESCRIPTIONS[item.name] ||
                    "No description available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecallStatusDistributionComponent;
