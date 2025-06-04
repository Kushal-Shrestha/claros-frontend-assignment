import { Routes, Route } from "react-router-dom";
import NavBarComponent from "./components/nav-bar/NavBarComponent";
import Homepage from "./components/home/Homepage";
import DrugComponent from "./components/drug/DrugComponent";
import FoodComponent from "./components/food/FoodComponent";
import InfoComponent from "./components/info/InfoComponent";

function App() {
  return (
    <div>
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/drug" element={<DrugComponent />} />
        <Route path="/food" element={<FoodComponent />} />
        <Route path="/info" element={<InfoComponent />} />
      </Routes>
    </div>
  );
}

export default App;
