import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchDrugs } from "../../redux/drugSlice";
import KpiCardComponent from "./charts/kpi-cards/KpiCardComponent";
import RecallStatusDistributionComponent from "./charts/recall-status-distributon/RecallStatusDistributionComponent";
import TopRecalledDrugsComponent from "./top-recalled-drugs/TopRecalledDrugsComponent";
import DrugShortageChart from "./charts/drug-shortages/DrugShortageChart";
import RecentRecallTableComponent from "../recent-recalls-table/RecentRecallTableComponent";
import DrugComponentInfo from "../drug-component-info/DrugComponentInfo";

const DrugsComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, filter, searchTerm } = useSelector(
    (state: RootState) => state.drugs
  );

  useEffect(() => {
    dispatch(fetchDrugs({ status: filter, searchTerm }));
  }, [dispatch, filter, searchTerm]);

  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow-lg">
      {/* Intro Component */}
      <DrugComponentInfo />

      {loading.initial && (
        <div className="text-blue-600 text-sm animate-pulse">
          Loading data...
        </div>
      )}
      {error && (
        <div className="text-red-500 bg-red-50 border border-red-200 rounded p-3">
          Error: {error}
        </div>
      )}

      {!loading.initial && !error && (
        <>
          {/* KPI Cards */}
          <KpiCardComponent />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <RecallStatusDistributionComponent />
            {/* Top Recalled Drugs */}
            <TopRecalledDrugsComponent />
          </div>

          {/* Drug Shortages Chart */}
          <div className="mb-6">
            <DrugShortageChart />
          </div>

          {/* Recent Recalls Table */}
          <RecentRecallTableComponent />
        </>
      )}
    </div>
  );
};

export default DrugsComponent;
