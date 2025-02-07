import React, { useState } from "react";

interface EditModalProps {
  todo: { id: number; text: string };
  onClose: () => void;
  onSave: (id: number, newText: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({ todo, onClose, onSave }) => {
  const [newText, setNewText] = useState(todo.text);

  const handleSave = () => {
    if (newText.trim().length > 0) {
      onSave(todo.id, newText);
    } else {
      alert("내용을 입력해주세요! (1자 이상)");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup" style={{height:"30vh",width:'35vw'}}>
        <div style={{fontFamily:'hanb',fontSize:'30px',margin:'1vh'}}> Edit Todo </div>
       <div >
       <input style={{  color: 'black', width: '30vw', height: '3vh', borderRadius: '50px', backgroundColor: "#C5DEDA", padding: "1.3vw", fontSize:'17px'}}
          type="text"
          value={newText}
          placeholder="what you edit?" 
          onChange={(e) => setNewText(e.target.value)}
        /></div>
       <div style={{ marginTop: "1vw", display: "flex", justifyContent: "center" }}>
        <button onClick={handleSave} style={{ padding: "8px 12px", backgroundColor: "#C5DEDA", color: "black", marginRight: "5vw",cursor:"default" }}>
              저장 </button>
        <button onClick={onClose} style={{ padding: "8px 12px", backgroundColor: "#E9E9E9", color: "black" ,cursor:"default"}}>
              취소 </button>
              </div>
      </div>
    </div>
  );
};

export default EditModal;
