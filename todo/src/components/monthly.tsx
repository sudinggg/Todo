import React from "react";
import { useNavigate } from "react-router-dom"; // 추가

interface MonthlyProps {
  month: { id: number, name: string }; // 월을 id와 name으로 받음
}

const Monthly: React.FC<MonthlyProps> = ({ month }) => {
  const navigate = useNavigate(); // 네비게이션 훅 사용

  return (
    <div className="month-card">
      <div style={{ fontFamily:'hanb',textAlign: "left", fontSize: '22px', fontWeight: "bolder",marginBottom:"0.8vh" }}>{month.name}</div>
      <div style={{ textAlign: "left" }}>
      <div style={{ lineHeight: '1.3' }}>Report</div>
       <div style={{ lineHeight: '1' }}>Goal completions 0/2</div>
      </div>
      <div style={{ width: '18vw', borderRadius: '50px', display: 'flex', justifyContent: 'center',paddingRight:'1vw',paddingTop:'0.5vh' }}>
        <button 
          style={{ backgroundColor: '#C5DEDA', width: '15vw', marginTop: '1vh' }}
          onClick={() => navigate(`/month/${month.id}`)} // 클릭 시 이동 (id로 이동)
        >
          plus your list!
        </button>
      </div>
    </div>
  );
};

export default Monthly;
