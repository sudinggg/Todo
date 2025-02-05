import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCheck, FaTrash } from "react-icons/fa";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const MonthDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);
  const monthId = Number(id);

  const storedTodos = localStorage.getItem(`todos-${monthId}`);
  const initialTodos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [inputValue, setInputValue] = useState("");

  const months = [
    { id: 1, name: "January" }, { id: 2, name: "February" }, { id: 3, name: "March" },
    { id: 4, name: "April" }, { id: 5, name: "May" }, { id: 6, name: "June" },
    { id: 7, name: "July" }, { id: 8, name: "August" }, { id: 9, name: "September" },
    { id: 10, name: "October" }, { id: 11, name: "November" }, { id: 12, name: "December" }
  ];
  const month = months.find(m => m.id === monthId)?.name || "Unknown";

  useEffect(() => {
    localStorage.setItem(`todos-${monthId}`, JSON.stringify(todos));
  }, [todos, monthId]);

  const addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newTodos = [...todos, { id: Date.now(), text: inputValue, completed: false }];
      setTodos(newTodos);
      setInputValue("");
    }
  };

  const toggleComplete = (todoId: number) => {
    setTodos(todos.map(todo => 
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [todos]);

  return (
    <div className="app">
      <div style={{ fontFamily: 'hanb', fontSize: '55px' }}>{month}</div>
      <div className="gray-box" style={{ margin: '1.5vw' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', height: '50px' }}>
<div>
  <button
    style={{ position: 'absolute',
      top:'18.6vh',      left: '31vw',
      fontSize: '20px',
      cursor: 'defualt',
      background: 'none',
      border: 'none',
      color: 'black'
    }}
    onClick={() => navigate(-1)}
  >
    <IoIosArrowRoundBack />
  </button></div>
  <div style={{ fontSize: '22px', textAlign: 'center' }}>Daily to do list</div>
</div>
        <input
          style={{ width: '35vw', height: '5vh', borderRadius: '50px', backgroundColor: "#C5DEDA", padding: "1.2vw",color:'black',fontSize:'17px'
          }}
          type="text"
          placeholder="Add something to do!"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={addTodo}
        />
        <div ref={listRef} style={{ height: '60vh', width: '35vw', backgroundColor: 'white', overflowY: 'auto', padding: '10px' }}>
          {todos.map((todo) => (
            <div key={todo.id} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.5vw',
              borderBottom: '1px solid #ddd'
            }}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  flexGrow: 1,
                  cursor: 'default'
                }}
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.text}
              </span>
              <button onClick={() => toggleComplete(todo.id)} style={{ marginLeft: "1vw", cursor:'default', background: "none", border: "none" }}>
                <FaCheck color={todo.completed ? "green" : "gray"} />
              </button>
              <button onClick={() => removeTodo(todo.id)} style={{ cursor: 'default', background: "none", border: "none" }}>
                <FaTrash color="red" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthDetail;
