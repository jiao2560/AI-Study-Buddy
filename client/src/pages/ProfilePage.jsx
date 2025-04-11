import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchStudyMaterials, deleteStudyMaterial } from "../services/api";
import "./ProfilePage.css";
import "./StudyMaterials.css";
import { useParams, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [ownMaterials, setOwnMaterials] = useState([]);
  const [bookmarkedMaterials, setBookmarkedMaterials] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  // ✅ 判断是否是自己 or 管理员查看别人
  const localUserId = localStorage.getItem("userId");
  const localUserRole = localStorage.getItem("role");
  const isOwnProfile = userId === localUserId;
  const isAdminViewingOthers = localUserRole === "admin" && !isOwnProfile;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/profile/${userId}`
        );
        console.log("User Info 👉", res.data);

        setUserInfo(res.data);
        const allMaterialsRes = await fetchStudyMaterials();
        const bookmarked = allMaterialsRes.data.filter((m) =>
          res.data.bookmarks.includes(m._id)
        );
        setBookmarkedMaterials(bookmarked);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    const fetchUserMaterials = async () => {
      try {
        const res = await fetchStudyMaterials();
        const filtered = res.data.filter((m) => m.user_id === userId);
        setOwnMaterials(filtered);
      } catch (err) {
        console.error("Failed to load materials", err);
      }
    };

    fetchProfile();
    fetchUserMaterials();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await deleteStudyMaterial(id);
      setOwnMaterials((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-page-grid">
        {/* Profile Info */}
        <div className="profile-section">
          <div className="profile-header-center">
            <div className="profile-header">
              <span className="profile-icon">👤</span>
              <h1 className="profile-title">Profile</h1>
            </div>
            {userInfo ? (
              <div className="profile-info">
                <p>
                  <strong>Username:</strong> {userInfo.username}
                </p>
                <p>
                  <strong>Email:</strong> {userInfo.email}
                </p>
                <p>
                  <strong>Registered:</strong>{" "}
                  {new Date(userInfo.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ) : (
              <p>Loading profile...</p>
            )}
          </div>
        </div>

        {/* ✅ 如果是本人且不是管理员 */}
        {isOwnProfile && userInfo?.role !== "admin" && (
          <>
            {/* Your Study Materials */}
            <div className="profile-section">
              <h2>📘 Your Study Materials</h2>
              <div className="material-list">
                {ownMaterials.length === 0 ? (
                  <p style={{ color: "#ccc" }}>
                    You haven't created any materials yet.
                  </p>
                ) : (
                  ownMaterials.map((m) => (
                    <div className="material-card" key={m._id}>
                      <h3>{m.title}</h3>
                      <p>
                        {m.content.length > 225 ? (
                          <>
                            {m.content.slice(0, 225)}...{" "}
                            <span
                              className="read-more"
                              onClick={() =>
                                navigate(`/study-materials/${m._id}`)
                              }
                            >
                              Read more
                            </span>
                          </>
                        ) : (
                          m.content
                        )}
                      </p>
                      <div className="card-actions">
                        <button
                          onClick={() =>
                            navigate(`/study-materials/${m._id}`)
                          }
                        >
                          👁 View
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/study-materials/${m._id}/edit`)
                          }
                        >
                          ✏️ Edit
                        </button>
                        <button onClick={() => handleDelete(m._id)}>
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bookmarked Materials */}
            <div className="profile-section">
              <h2>🔖 Bookmarked Materials</h2>
              <div className="material-list">
                {bookmarkedMaterials.length === 0 ? (
                  <p style={{ color: "#ccc" }}>
                    You haven’t bookmarked any materials yet.
                  </p>
                ) : (
                  bookmarkedMaterials.map((m) => (
                    <div className="material-card" key={m._id}>
                      <h3>{m.title}</h3>
                      <p>
                        {m.content.length > 225 ? (
                          <>
                            {m.content.slice(0, 225)}...{" "}
                            <span
                              className="read-more"
                              onClick={() =>
                                navigate(`/study-materials/${m._id}`)
                              }
                            >
                              Read more
                            </span>
                          </>
                        ) : (
                          m.content
                        )}
                      </p>
                      <div className="card-actions">
                        <button
                          onClick={() =>
                            navigate(`/study-materials/${m._id}`)
                          }
                        >
                          👁 View
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}

        {/* ✅ 如果是管理员在查看别人 */}
        {isAdminViewingOthers && (
          <div className="profile-section">
            <h2>👁️ Admin View: User Info</h2>
            <p>
              <strong>Username:</strong> {userInfo.username}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p>
              <strong>Role:</strong> {userInfo.role}
            </p>
            <p>
              <strong>Registered:</strong>{" "}
              {new Date(userInfo.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {/* 你可以加：用户举报数、内容量、活跃状态等 */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
