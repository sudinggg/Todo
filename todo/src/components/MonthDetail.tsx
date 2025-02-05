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

  // ✅ 리스트 자동 스크롤
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [todos]);

  return (
    <div className="app">
      {/* 월 이름 표시 */}
      <div style={{ fontFamily: 'hanb', fontSize: '55px' }}>{month}</div>

      <div className="gray-box" style={{ margin: '1vw' }}>
        {/* 뒤로 가기 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "1vh" }}>
          <button style={{ fontSize: '20px', cursor: "pointer", background: "none", border: "none" }} onClick={() => navigate(-1)}>
            <IoIosArrowRoundBack />
          </button>
          <div style={{ fontSize: '20px', paddingLeft: '10vw' }}>Daily to do list</div>
        </div>

        {/* 입력 필드 */}
        <input
          style={{ width: '35vw', height: '4.6vh', borderRadius: '50px', backgroundColor: "#C5DEDA", padding: "10px" }}
          type="text"
          placeholder="넌 뭘 해야하니"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={addTodo}
        />

        {/* 리스트 */}
        <div ref={listRef} style={{ height: '60vh', width: '35vw', backgroundColor: 'white', overflowY: 'auto', padding: '10px' }}>
          {todos.map((todo) => (
            <div key={todo.id} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              borderBottom: '1px solid #ddd'
            }}>
              {/* 할 일 텍스트 (클릭하면 완료 토글) */}
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

              {/* 완료 버튼 */}
              <button onClick={() => toggleComplete(todo.id)} style={{ marginLeft: "10px", cursor:'default', background: "none", border: "none" }}>
                <FaCheck color={todo.completed ? "green" : "gray"} />
              </button>

              {/* 삭제 버튼 */}
              <button onClick={() => removeTodo(todo.id)} style={{ marginLeft: "10px", cursor: 'default', background: "none", border: "none" }}>
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
