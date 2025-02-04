import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface MonthlyProps {
  month: { id: number, name: string };
}

const Monthly: React.FC<MonthlyProps> = ({ month }) => {
  const navigate = useNavigate();
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    const savedTodos = localStorage.getItem(`todos-${month.id}`);
    if (savedTodos) {
      const todos = JSON.parse(savedTodos);
      setTotalTasks(todos.length);
      setCompletedTasks(todos.filter((todo: any) => todo.completed).length);
    }
  }, [month.id]);

  return (
    <div className="month-card">
      <div style={{ fontFamily: 'hanb', textAlign: "left", fontSize: '22px', fontWeight: "bolder", marginBottom: "0.8vh" }}>
        {month.name}
      </div>
      <div style={{ textAlign: "left" }}>
        <div style={{ lineHeight: '1.3' }}>Report</div>
        <div style={{ lineHeight: '1' }}>Goal completions {completedTasks}/{totalTasks}</div>
      </div>
      <div style={{ width: '18vw', borderRadius: '50px', display: 'flex', justifyContent: 'center', paddingRight: '1vw', paddingTop: '0.5vh' }}>
        <button
          style={{ backgroundColor: '#C5DEDA', width: '15vw', marginTop: '1vh' }}
          onClick={() => navigate(`/month/${month.id}`)}
        >
          plus your list!
        </button>
      </div>
    </div>
  );
};

export default Monthly;
