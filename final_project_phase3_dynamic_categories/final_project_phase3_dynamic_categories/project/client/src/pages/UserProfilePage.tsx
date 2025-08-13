import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  joinDate: string;
  totalOrders: number;
  favoriteCategory: string;
}

const UserProfilePage: React.FC = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    fetchUserProfile();
  }, [isLoggedIn, navigate]);

  const fetchUserProfile = async () => {
    try {
      // Using user ID from context, or default to 1 for demo
      const userId = user?.id || 1;
      const response = await fetch(`http://localhost:8000/api/users/${userId}`);
      const data = await response.json();
      console.log('User profile response:', data);
      
      if (data.success) {
        setProfile(data.data);
      } else {
        setError(data.message || 'Failed to load profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="auth-required">
            <h2>Authentication Required</h2>
            <p>Please log in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="loading">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="error-message">{error}</div>
          <button onClick={fetchUserProfile} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your EcoCart account and view your eco-friendly shopping journey</p>
        </div>

        {profile && (
          <div className="profile-content">
            <div className="profile-card">
              <div className="profile-info">
                <h2>Personal Information</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Full Name</label>
                    <p>{profile.name}</p>
                  </div>
                  <div className="info-item">
                    <label>Email Address</label>
                    <p>{profile.email}</p>
                  </div>
                  <div className="info-item">
                    <label>Member Since</label>
                    <p>{new Date(profile.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div className="info-item">
                    <label>User ID</label>
                    <p>#{profile.id}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-stats">
              <h2>Your EcoCart Journey</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📦</div>
                  <div className="stat-info">
                    <h3>{profile.totalOrders}</h3>
                    <p>Total Orders</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">💚</div>
                  <div className="stat-info">
                    <h3>{profile.favoriteCategory}</h3>
                    <p>Favorite Category</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🌱</div>
                  <div className="stat-info">
                    <h3>Eco Warrior</h3>
                    <p>Status Level</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <h2>Account Actions</h2>
              <div className="actions-grid">
                <button className="action-btn">
                  Edit Profile
                </button>
                <button className="action-btn">
                  Order History
                </button>
                <button className="action-btn">
                  Wishlist
                </button>
                <button className="action-btn">
                  Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
