import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
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
        const reportsWithDetails = await Promise.all(
          res.data.map(async (r) => {
            const material = await fetchStudyMaterialById(r.study_material_id);
            const user = await fetchUserProfile(r.flagged_by, token);
            return {
              ...r,
              materialTitle: material?.data?.title || "Material Deleted",
              flaggedByName: user?.data?.username || "Unknown user",
            };
          })
        );
        setReports(reportsWithDetails);
      } catch (err) {
        console.error("Failed to load reports", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllReports();
  }, [token]);

  const resolveReport = async (id) => {
    try {
      await updateReport(id, { status: "resolved" }, token);
      setReports((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "resolved" } : r))
      );
    } catch (err) {
      console.error("Failed to resolve report", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      await deleteReport(id, token);
      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to delete report", err);
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
                <td>
                  <Link to={`/study-materials/${r.study_material_id}`}>
                    {r.materialTitle}
                  </Link>
                </td>
                <td>{r.reason}</td>
                <td>{r.flaggedByName}</td>
                <td>{r.status}</td>
                <td>
                  {r.status === "pending" && (
                    <button onClick={() => resolveReport(r._id)}>
                      ✅ Resolve
                    </button>
                  )}
                  <button onClick={() => handleDelete(r._id)}>
                    🗑️ Delete Report
                  </button>
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
