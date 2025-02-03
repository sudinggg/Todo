import { useParams } from "react-router-dom";

const MonthDetail: React.FC = () => {
  const { id } = useParams(); 

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

  const month = months.find(m => m.id === Number(id));

  return (
    <div className="app">
      {month ? (
        <>
          <div style={{fontFamily:'hanb',fontSize:'55px'}}>{month.name}</div>
          <div className="gray-box" style={{margin:'1vw'}}>
dd
          </div>

        </>
      ) : (
        <h1>Invalid Month</h1>
      )}
    </div>
  );
};

export default MonthDetail;
