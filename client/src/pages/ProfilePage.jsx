import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.css";
import "./StudyMaterials.css";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/profile/${userId}`
        );
        setUserInfo(res.data);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="study-materials-page">
      <div className="profile-page">
        <div className="profile-left">
          <div className="profile-box">
            <div className="profile-header">
              <span className="profile-icon">👤</span>
              <h1 className="profile-title">Profile</h1>
            </div>
            {userInfo ? (
              <div className="profile-info">
                <p><strong>Username:</strong> {userInfo.username}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
              </div>
            ) : (
              <p>Loading profile...</p>
            )}
          </div>
        </div>
        <div className="profile-right">
          {/* Reserved for future content */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
