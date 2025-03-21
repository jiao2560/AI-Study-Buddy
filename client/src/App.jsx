import React, { useEffect, useState } from "react";
import { fetchStudyMaterials } from "./services/api";

function App() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchStudyMaterials().then((res) => setMaterials(res.data)).catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Study Materials</h1>
      <ul>
        {materials.map((material) => (
          <li key={material._id}>{material.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
