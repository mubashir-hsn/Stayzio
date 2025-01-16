import React, { useState } from 'react';
import { useAuth } from '../contextApi/AuthProvider.jsx';
import axios from 'axios';
import userImg from '../assets/avatar.png';
import { FaCamera } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Profile = () => {
  const { authUser, updateAuthUser } = useAuth();
  const [profileImage, setProfileImage] = useState(null); // State for selected profile image
  const [previewImage, setPreviewImage] = useState(authUser?.user?.profileImg?.url || userImg); // Preview image
  const [showUpdateButton, setShowUpdateButton] = useState(false); // Show Update Profile button
  const [loading, setLoading] = useState(false); // Loading state

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Update the preview
      setShowUpdateButton(true); // Show the Update Profile button
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    if (!profileImage) {
      toast.error('Please select an image to upload.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('photo', profileImage);

      const response = await axios.post(
        'http://localhost:4001/api/users/upload-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // Include cookies for authentication
        }
      );

      if (response.status === 200) {
        toast.success('Profile updated successfully!');
        updateAuthUser(response.data); // Update the auth context with the new user data
        setShowUpdateButton(false); // Hide the Update Profile button after successful update
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex container-fluid">
      <div className="profile px-2 py-5 bg-white overflow-hidden shadow rounded-4 flex flex-column gap-3">
        <div
          className="flex mt-1 p-2 bg-light z-1 shadow-sm rounded-circle border border-3 border-dark position-relative"
          style={{ height: '120px' }}
        >
          {/* Profile Image */}
          <img
            src={previewImage}
            alt="Profile"
            className="rounded-circle"
            style={{ height: '100px', width: '100px', objectFit: 'cover' }}
          />
          {/* Camera Icon */}
          <label
            htmlFor="imageUpload"
            className="position-absolute bottom-0 end-0 bg-dark text-white rounded-circle d-flex justify-content-center align-items-center"
            style={{
              height: '30px',
              width: '30px',
              cursor: 'pointer',
            }}
          >
            <FaCamera />
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/jpeg,image/png"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>
        <div>
          <h4 className="fw-semibold text-center" style={{ fontSize: '20px' }}>
            {authUser?.user?.fullName}
          </h4>
          <div className="d-flex flex-column gap-1 mt-3 fw-medium">
            <span>
              <b style={{ fontSize: '17px' }}>Role: </b> {authUser?.user?.role}.
            </span>
            <span>
              <b style={{ fontSize: '17px' }}>Bio:</b> Be Happy.
            </span>
            <span>
              <b style={{ fontSize: '17px' }}>Email: </b> {authUser?.user?.email}.
            </span>
          </div>
        </div>
        {/* Show Update Profile button only if an image is selected */}
        {showUpdateButton && (
          <button
            className="btn btn-primary mt-3"
            onClick={handleUpdateProfile}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
