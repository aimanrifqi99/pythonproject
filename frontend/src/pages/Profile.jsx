// pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Profile.css';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [aimGameScores, setAimGameScores] = useState([]);
  const [typingGameScores, setTypingGameScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get('/api/users/me/');
        setUserData(userResponse.data);

        const aimScoresResponse = await api.get('/api/aim-game-scores/', {
          params: {
            user: userResponse.data.id,
            ordering: '-date_and_time',
          },
        });
        setAimGameScores(aimScoresResponse.data.results || aimScoresResponse.data || []);

        const typingScoresResponse = await api.get('/api/typing-game-scores/', {
          params: {
            user: userResponse.data.id,
            ordering: '-date_and_time',
          },
        });
        setTypingGameScores(typingScoresResponse.data.results || typingScoresResponse.data || []);
      } catch (err) {
        console.error(err);
        setAimGameScores([]);
        setTypingGameScores([]);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Adjust based on your authentication method
    navigate('/logout');
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  if (!userData) {
    return <div className="profile-page">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <button className="back-button" onClick={handleBack}>
        Back
      </button>
      <div className="profile-container">
        <img
          src={userData.profilePicture || 'Profile.jpeg'}
          alt="Profile"
          className="profile-pic"
        />
        <h2 className="username">{userData.username}</h2>
        <p className="email">{userData.email}</p>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="scoreboards-section">
        <div className="scoreboard">
          <h3>Aim Game Scores</h3>
          {aimGameScores && aimGameScores.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {aimGameScores.map((score, index) => (
                  <tr key={score.id}>
                    <td>{index + 1}</td>
                    <td>{score.score}</td>
                    <td>{new Date(score.date_and_time).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No scores available.</p>
          )}
        </div>

        <div className="scoreboard">
          <h3>Typing Game Scores</h3>
          {typingGameScores && typingGameScores.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {typingGameScores.map((score, index) => (
                  <tr key={score.id}>
                    <td>{index + 1}</td>
                    <td>{score.score}</td>
                    <td>{new Date(score.date_and_time).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No scores available.</p>
          )}
        </div>
        {/*new game table*/}
      </div>
    </div>
  );
}

export default Profile;
