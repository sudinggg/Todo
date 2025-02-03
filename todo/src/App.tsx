import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Monthly from "./components/monthly";
import MonthDetail from "./components/MonthDetail"; // 추가
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const months = [
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];

  const filteredMonths = months.filter((month) =>
    month.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="app">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"1vh" }}>
              <div style={{ fontFamily:'hanb',fontSize: '50px', paddingRight: '3vw' }}>Todo_List</div>
              <div>☀️</div>
            </div>

            <input 
              style={{ width: '45vw', height: '4.5vh', borderRadius: '50px', backgroundColor: "#C5DEDA" }} 
              type="text" placeholder="Search..." 
              value={search} onChange={(e) => setSearch(e.target.value)}
            />
            <div className="month-list">
              {filteredMonths.map((month) => (
                <Monthly key={month.id} month={month} />
              ))}
            </div>
          </div>
        } />

        <Route path="/month/:id" element={<MonthDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
