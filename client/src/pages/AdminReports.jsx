import React, { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import "./AdminReports.css"; // for styling

const AdminReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get("/reports");
        setReports(res.data);
      } catch (err) {
        console.error("Failed to load reports", err);
      }
    };

    fetchReports();
  }, []);

  // change report status to resolved
  const resolveReport = async (id) => {
    try {
      const res = await api.put(`/reports/${id}`, { status: "resolved" });
      setReports((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "resolved" } : r))
      );
    } catch (err) {
      console.error("Failed to update report", err);
    }
  };

  // delete report
    // confirm before deleting
  const deleteReport = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      await api.delete(`/reports/${id}`);
      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to delete report", err);
    }
  };

  return (
    <div className="admin-reports-page">
      <h2>📋 Admin Reports</h2>
      {reports.length === 0 ? (
        <p>No reports yet.</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>Reason</th>
              <th>Material ID</th>
              <th>Flagged By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r._id}>
                <td>{r.reason}</td>
                <td>{r.study_material_id}</td>
                <td>{r.flagged_by}</td>
                <td>{r.status}</td>
                <td>
                  {r.status === "pending" && (
                    <button onClick={() => resolveReport(r._id)}>✅ Resolve</button>
                  )}
                  <button onClick={() => deleteReport(r._id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReports;
