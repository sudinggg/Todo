import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MonthlyList from "./components/MonthlyList";
import MonthDetail from "./components/MonthDetail";
import SearchBar from "./components/SearchBar";
import SearchResultsPopup from "./components/SearchResultsPopup";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState<{ month: string; tasks: string[] }[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleSearchResults = (results: { month: string; tasks: string[] }[]) => {
    setSearchResults(results);
    setIsPopupOpen(true);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="app"> 
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"1.5vh" }}>
            <div style={{ fontFamily:'hanb',fontSize: '50px', paddingRight: '3vw'}}>Todo_List </div></div>
            <div> <SearchBar onSearchResults={handleSearchResults} />  </div>
            <div> <MonthlyList /> </div>
            {isPopupOpen && (
              <SearchResultsPopup results={searchResults} onClose={() => setIsPopupOpen(false)} />
            )}
          </div>
        } />
        <Route path="/month/:id" element={<MonthDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
