interface SearchResultsPopupProps {
    results: { month: string; tasks: string[] }[];
    onClose: () => void;
  }
  
  const SearchResultsPopup: React.FC<SearchResultsPopupProps> = ({ results, onClose }) => {
    return (
      <div className="popup-overlay">
        <div className="popup" style={{backgroundColor:'#C5DEDA'}}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: "1vh", width: '100%' }}>
  <div style={{paddingLeft:'5vw', fontFamily:'hanb',fontSize: '25px', margin: '0 auto' ,height:'3vh'}}>Search_Results</div>
  <div><button style={{ color:'black',fontSize:'21px',background: "none",border: "none",height:'1vh'}} onClick={onClose}>x</button></div>
</div>
<div className="list-container">
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="popup-month">
                <div style={{fontFamily:'hanb'}}> {result.month}</div>
                <div >   <ul>
                  {result.tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul></div>
              </div>
            ))
          ) : (
            <p>No matching tasks found.</p>
          )}</div>
        </div>
      </div>
    );
  };
  export default SearchResultsPopup;
  