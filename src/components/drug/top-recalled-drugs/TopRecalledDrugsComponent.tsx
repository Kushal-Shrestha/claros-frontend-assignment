import { AlertTriangle } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
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
        name: name.length > 20 ? name.substring(0, 50) + "..." : name,
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
                bottom: 100,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.1)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={120}
                tick={{
                  fill: "rgba(255, 255, 255, 0.8)",
                  fontSize: 12,
                }}
                interval={0}
                dy={10}
              />
              <YAxis
                tick={{
                  fill: "rgba(255, 255, 255, 0.8)",
                  fontSize: 12,
                }}
                width={40}
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
              <Legend
                wrapperStyle={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="value"
                fill="#8884d8"
                name="Number of Recalls"
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
        <div className="mt-4 flex flex-wrap gap-2">
          {prepareTopRecalledDrugs().map((item, index) => (
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

export default TopRecalledDrugsComponent;
