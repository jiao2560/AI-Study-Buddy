import React, { useEffect, useState } from "react";
import { fetchStudyMaterials } from "./services/api.js";

function App() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchStudyMaterials()
      .then((res) => {
        console.log("Fetched Study Materials:", res.data);
        setMaterials(res.data);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <h1>Study Materials</h1>
      {materials.length === 0 ? (
        <p>No study materials found.</p>
      ) : (
        <ul>
          {materials.map((material) => (
            <li key={material._id}>
              <h3>{material.title}</h3>
              <p>{material.content}</p>
              <p><b>Created At:</b> {new Date(material.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
