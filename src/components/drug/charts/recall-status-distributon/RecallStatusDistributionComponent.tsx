import { Activity } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { COLORS } from "../../../../../theme";

const RecallStatusDistributionComponent = () => {
  const { data } = useSelector((state: RootState) => state.drugs);

  const prepareRecallByStatusData = () => {
    const statusCounts: Record<string, number> = {};
    data.enforcement.forEach((item: any) => {
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
        <div className="mt-4 flex flex-wrap gap-2">
          {prepareRecallByStatusData().map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />
              <span className="text-sm text-white/80">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecallStatusDistributionComponent;
