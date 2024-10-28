import React, { useEffect, useState } from 'react';
import Navbar from './navbar';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            emailaddr: localStorage.getItem('email') // Assuming you're storing the email in localStorage after login
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.errors?.[0]?.msg || 'Failed to fetch profile data');
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch profile data:', err);
      }
    };

    fetchProfileData();
  }, []);

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1>Profile</h1>
          <p className="text-danger">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1>Profile</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Profile</h1>
        <p>Name: {profileData.name}</p>
        <p>Email: {profileData.email}</p>
        <p>Location: {profileData.location}</p>
      </div>
    </div>
  );
};

export default Profile;
