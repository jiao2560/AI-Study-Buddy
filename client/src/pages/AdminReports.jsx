import React, { useEffect, useState } from "react";
import api from "../utils/axiosInstance";


const AdminReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get("/admin-reports"); // 自动带 token
        setReports(res.data);
      } catch (err) {
        console.error("Failed to load reports:", err.response?.data?.error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>📋 Admin Reports</h2>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li key={report._id}>
              Material: {report.study_material_id} | Reason: {report.reason} | Status: {report.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminReports;
