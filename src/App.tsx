import { Routes, Route } from "react-router-dom";
import SidebarLayout from "./components/nav-bar/NavBarComponent";
import DrugComponent from "./components/drug/DrugComponent";
import Homepage from "./components/home/Homepage";
import InfoComponent from "./components/info/InfoComponent";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SidebarLayout />}>
        <Route index element={<Homepage />} />
        <Route path="drug" element={<DrugComponent />} />
        <Route path="info" element={<InfoComponent />} />
      </Route>
    </Routes>
  );
}
