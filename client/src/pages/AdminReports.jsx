import React, { useEffect, useState } from "react";
import {
  fetchReports,
  updateReport,
  deleteReport,
  fetchStudyMaterialById,
  fetchUserProfile,
} from "../services/api";
import "./AdminReports.css";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllReports = async () => {
      try {
        const res = await fetchReports(token);
        const detailedReports = await Promise.all(
          res.data.map(async (r) => {
            const materialRes = await fetchStudyMaterialById(r.study_material_id);
            const userRes = await fetchUserProfile(r.flagged_by, token);
            return {
              ...r,
              materialTitle: materialRes?.data?.title || "Unknown Material",
              flaggedByName: userRes?.data?.username || "Unknown User",
            };
          })
        );
        setReports(detailedReports);
      } catch (err) {
        console.error("❌ Failed to fetch reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllReports();
  }, [token]);

  const resolveReport = async (reportId) => {
    try {
      await updateReport(reportId, { status: "resolved" }, token);
      setReports((prev) =>
        prev.map((r) => (r._id === reportId ? { ...r, status: "resolved" } : r))
      );
    } catch (err) {
      console.error("❌ Failed to resolve report:", err);
    }
  };

  const handleDelete = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      await deleteReport(reportId, token);
      setReports((prev) => prev.filter((r) => r._id !== reportId));
    } catch (err) {
      console.error("❌ Failed to delete report:", err);
    }
  };

  return (
    <div className="admin-reports-page">
      <h2>🛡️ Admin: Reported Materials</h2>

      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>Material Title</th>
              <th>Reason</th>
              <th>Flagged By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r._id}>
                <td>{r.materialTitle}</td>
                <td>{r.reason}</td>
                <td>{r.flaggedByName}</td>
                <td>{r.status}</td>
                <td>
                  {r.status === "pending" && (
                    <button onClick={() => resolveReport(r._id)}>✅ Resolve</button>
                  )}
                  <button onClick={() => handleDelete(r._id)}>🗑️ Delete</button>
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
