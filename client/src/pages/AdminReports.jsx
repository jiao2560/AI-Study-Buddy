import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchReports,
  updateReport,
  deleteReport,
  fetchStudyMaterialById,
  fetchUserProfile,
  deleteStudyMaterial,
  fetchAllUsers, // ✅ Ensure this exists in your api.js
} from "../services/api";
import "./AdminReports.css";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]); // ✅ new state for system users
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
      }
    };

    const fetchUsers = async () => {
      try {
        const userRes = await fetchAllUsers(token);
        setUsers(userRes.data);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllReports();
    fetchUsers(); // ✅ Load users when page loads
  }, [token]);

  const resolveReport = async (id) => {
    await updateReport(id, { status: "resolved" }, token);
    setReports((prev) => prev.map((r) => (r._id === id ? { ...r, status: "resolved" } : r)));
  };

  const handleDeleteReport = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    await deleteReport(id, token);
    setReports((prev) => prev.filter((r) => r._id !== id));
  };

  const handleDeleteMaterial = async (materialId) => {
    if (!window.confirm("Are you sure you want to delete this material?")) return;
    await deleteStudyMaterial(materialId);
    setReports((prev) => prev.filter((r) => r.study_material_id !== materialId));
    alert("Material successfully deleted.");
  };

  return (
    <div className="admin-reports-page">
      <h2>🛡️ Admin: Reported Materials</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
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
                    <button onClick={() => handleDeleteReport(r._id)}>
                      🗑️ Delete Report
                    </button>
                    <button onClick={() => handleDeleteMaterial(r.study_material_id)}>
                      🚫 Delete Material
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ Enhanced System Report for Users */}
          <h2 style={{ marginTop: "3rem" }}>📈 System Users Report</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <Link to={`/profile/${user._id}`}>{user.username}</Link>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminReports;
