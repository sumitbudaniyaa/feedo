import { useState } from "react";
import "./tableno.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const TableNo = () => {
  const { restaurantId } = useParams();

  const [tableno, settableno] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    navigate(`/${restaurantId}/${tableno}`);
  };

  return (
    <div className="tableno">
      <header>
        <h4>feedo.</h4>
      </header>

      <div className="tableno-card">
        <h3>Enter table no</h3>
        <input
          type="text"
          placeholder="Table No."
          value={tableno}
          onChange={(e) => settableno(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default TableNo;
