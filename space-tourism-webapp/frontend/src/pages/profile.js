// frontend/src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { getProfile } from "../services/apiService";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Retrieve the stored JWT from localStorage (or your state management)
    const token = localStorage.getItem("token");

    if (token) {
      // Call the getProfile API service function
      getProfile(token)
        .then((data) => {
          if (data.user) {
            setProfileData(data.user);
          } else {
            setErrorMsg(data.message || "Failed to fetch profile");
          }
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setErrorMsg("Failed to fetch profile");
        });
    } else {
      setErrorMsg("No token found. Please login first.");
    }
  }, []);

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {errorMsg && <p>{errorMsg}</p>}
      {profileData ? (
        <div>
          <p>User ID: {profileData.id}</p>
          <p>Role: {profileData.role}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
