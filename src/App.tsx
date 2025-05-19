import "./App.css";
import ProjectDashboardExample from "./pages/ProjectDashboardExample";
import HQDivisionPage from "./pages/HQDivisionPage";
import ProjectSizeChartTest from "./test/ProjectSizeChartTest";
import HQDivisionChartTest from "./test/HQDivisionChartTest";
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState<"dashboard" | "hqDivision" | "projectSizeTest" | "hqDivisionTest">("dashboard");

  return (
    <div className="min-h-screen bg-[#101010]">
      <div className="flex justify-center gap-4 p-4 border-b border-gray-800 flex-wrap">
        <button 
          className={`px-4 py-2 rounded ${currentPage === "dashboard" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
          onClick={() => setCurrentPage("dashboard")}
        >
          Project Dashboard
        </button>
        <button 
          className={`px-4 py-2 rounded ${currentPage === "hqDivision" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
          onClick={() => setCurrentPage("hqDivision")}
        >
          HQ Division
        </button>
        <button 
          className={`px-4 py-2 rounded ${currentPage === "projectSizeTest" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
          onClick={() => setCurrentPage("projectSizeTest")}
        >
          ProjectSize Test
        </button>
        <button 
          className={`px-4 py-2 rounded ${currentPage === "hqDivisionTest" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
          onClick={() => setCurrentPage("hqDivisionTest")}
        >
          HQDivision Test
        </button>
      </div>
      
      {currentPage === "dashboard" && <ProjectDashboardExample />}
      {currentPage === "hqDivision" && <HQDivisionPage />}
      {currentPage === "projectSizeTest" && <ProjectSizeChartTest />}
      {currentPage === "hqDivisionTest" && <HQDivisionChartTest />}
    </div>
  );
}

export default App;
