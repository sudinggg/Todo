import { useState } from "react";

interface SearchBarProps {
  onSearchResults: (results: { month: string; tasks: string[] }[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults }) => {
  const [search, setSearch] = useState("");

  const months = [
    { id: 1, name: "January" }, { id: 2, name: "February" }, { id: 3, name: "March" },
    { id: 4, name: "April" }, { id: 5, name: "May" }, { id: 6, name: "June" },
    { id: 7, name: "July" }, { id: 8, name: "August" }, { id: 9, name: "September" },
    { id: 10, name: "October" }, { id: 11, name: "November" }, { id: 12, name: "December" }
  ];

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim() !== "") {
      const results = months.map((month) => {
        const storedTodos = localStorage.getItem(`todos-${month.id}`);
        if (storedTodos) {
          const todos = JSON.parse(storedTodos);
          const filteredTodos = todos.filter((todo: any) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          );
          if (filteredTodos.length > 0) {
            return { month: month.name, tasks: filteredTodos.map((todo: any) => todo.text) };
          }
        }
        return null; 
      }).filter((result) => result !== null); 

      onSearchResults(results as { month: string; tasks: string[] }[]); // 타입 단언
    }
  };

  return (
    <div >
    <input style={{ width: '45vw', height: '4.vh', borderRadius: '50px', backgroundColor: "#C5DEDA", padding: "10px" }}
type="text" placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={handleSearch}
    /> </div>
  );
};

export default SearchBar;
