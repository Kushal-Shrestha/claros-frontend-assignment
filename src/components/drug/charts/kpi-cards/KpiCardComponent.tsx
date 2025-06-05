import { Activity, AlertTriangle, FileWarning, Pill } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";

const KpiCardComponent = () => {
  const { data } = useSelector((state: RootState) => state.drugs);

  const getUniqueDrugCount = () =>
    new Set(data.enforcement.map((d: any) => d.product_description)).size;

  const getOngoingCount = () =>
    data.enforcement.filter((d: any) => d.status === "Ongoing").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
      {/* Total Recalls Card */}
      <div className="bg-primary rounded-xl p-4 md:p-6 shadow-sm border border-primary/20 hover:shadow-lg transition-all duration-300 hover:border-primary/30 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:bg-white/10 transition-colors duration-300"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white/80">
              Total Recalls
            </span>
          </div>
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-white mb-1">
              {data.enforcement.length}
            </div>
            <div className="text-sm text-white/60">drugs recalled</div>
          </div>
        </div>
      </div>

      {/* Unique Drugs Card */}
      <div className="bg-primary rounded-xl p-4 md:p-6 shadow-sm border border-primary/20 hover:shadow-lg transition-all duration-300 hover:border-primary/30 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:bg-white/10 transition-colors duration-300"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
              <Pill className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white/80">
              Unique Drugs
            </span>
          </div>
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-white mb-1">
              {getUniqueDrugCount()}
            </div>
            <div className="text-sm text-white/60">unique products</div>
          </div>
        </div>
      </div>

      {/* Ongoing Recalls Card */}
      <div className="bg-primary rounded-xl p-4 md:p-6 shadow-sm border border-primary/20 hover:shadow-lg transition-all duration-300 hover:border-primary/30 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:bg-white/10 transition-colors duration-300"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white/80">
              Ongoing Recalls
            </span>
          </div>
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-white mb-1">
              {getOngoingCount()}
            </div>
            <div className="text-sm text-white/60">active recalls</div>
          </div>
        </div>
      </div>

      {/* Adverse Events Card */}
      <div className="bg-primary rounded-xl p-4 md:p-6 shadow-sm border border-primary/20 hover:shadow-lg transition-all duration-300 hover:border-primary/30 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:bg-white/10 transition-colors duration-300"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
              <FileWarning className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white/80">
              Adverse Events
            </span>
          </div>
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-white mb-1">
              {data.events.length}
            </div>
            <div className="text-sm text-white/60">events reported</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiCardComponent;
