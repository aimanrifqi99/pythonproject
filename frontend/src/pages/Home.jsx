import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Scoreboard from "../components/Scoreboard";
import "./Home.css";

function Home() {
  const [aimGameTopScores, setAimGameTopScores] = useState([]);
  const [typingGameTopScores, setTypingGameTopScores] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get("/api/users/me/");
        setUserData(userResponse.data);

        const aimScoresResponse = await api.get("/api/aim-game-scores/", {
          params: { ordering: "-score", limit: 10 },
        });
        setAimGameTopScores(aimScoresResponse.data.results);

        const typingScoresResponse = await api.get("/api/typing-game-scores/", {
          params: { ordering: "-score", limit: 10 },
        });
        setTypingGameTopScores(typingScoresResponse.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const goToProfile = () => navigate("/profile");
  const goToAimGame = () => navigate("/aim-game");
  const goToTypingGame = () => navigate("/typing-game");

  return (
    <div>
      {/* Title Section */}
      <h2 className="page-title">Welcome to the Game Portal</h2>

      {/* Profile Section */}
      <div className="profile-section" onClick={goToProfile}>
        <img src="Profile.jpeg" alt="Profile" className="profile-pic" />
        <span className="username">{userData ? userData.username : "Username"}</span>
      </div>

      {/* Main Content */}
      <div className="home-container">
        <div className="home-content">
          {/* Games Section */}
          <div className="games-section">
            <button className="game-button" onClick={goToAimGame}>
              Aim Game
            </button>
            <button className="game-button" onClick={goToTypingGame}>
              Typing Game
            </button>
          </div>

          {/* Scoreboards Section */}
          <div className="scoreboards-section">
            <div className="scoreboard">
              <h3>Aim Game Top 10 Scores</h3>
              <Scoreboard scores={aimGameTopScores} />
            </div>
            <div className="scoreboard">
              <h3>Typing Game Top 10 Scores</h3>
              <Scoreboard scores={typingGameTopScores} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
