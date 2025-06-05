import { AlertTriangle } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { COLORS } from "../../../../theme";

const TopRecalledDrugsComponent = () => {
  const { data } = useSelector((state: RootState) => state.drugs);

  const prepareTopRecalledDrugs = () => {
    const drugCounts: Record<string, number> = {};
    data.enforcement.forEach((item: any) => {
      drugCounts[item.product_description] =
        (drugCounts[item.product_description] || 0) + 1;
    });
    return Object.entries(drugCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({
        name: name.length > 30 ? name.substring(0, 30) + "..." : name,
        value,
        fullName: name,
      }));
  };

  return (
    <div className="bg-primary rounded-xl p-6 shadow-sm border border-primary/20 hover:shadow-lg transition-all duration-300 hover:border-primary/30 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 group-hover:bg-white/10 transition-colors duration-300"></div>
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">
            Top Recalled Drugs
          </h3>
        </div>
        <div className="h-[400px] bg-white/5 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={prepareTopRecalledDrugs()}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
                vertical={false}
              />
              <XAxis dataKey="name" hide={true} />
              <YAxis
                tick={{
                  fill: "rgba(255, 255, 255, 0.8)",
                  fontSize: 12,
                }}
                width={40}
                label={{
                  value: "Number of Recalls",
                  angle: -90,
                  position: "insideLeft",
                  style: {
                    fill: "rgba(255, 255, 255, 0.8)",
                    fontSize: 12,
                  },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value, _, props) => {
                  return [`${value} recalls`, props.payload.fullName];
                }}
              />
              <Bar
                dataKey="value"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              >
                {prepareTopRecalledDrugs().map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2">
          {prepareTopRecalledDrugs().map((item, index) => (
            <div
              key={item.name}
              className="flex items-start gap-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-medium text-white truncate">
                  {item.fullName}
                </span>
                <span className="text-xs text-white/60 mt-0.5">
                  {item.value} recalls
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRecalledDrugsComponent;
