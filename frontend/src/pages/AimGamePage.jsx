// src/pages/AimGamePage.jsx
import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './AimGamePage.css';

function AimGamePage() {
  const INITIAL_TIME = 20; // Initial time in seconds
  
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [targetPosition, setTargetPosition] = useState({ top: '50%', left: '50%' });
  const [topScore, setTopScore] = useState(null);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [userData, setUserData] = useState(null); // State to store user data
  const navigate = useNavigate();

  // Fetch user data and their top score on component mount
  useEffect(() => {
    const initializeGame = async () => {
      await fetchUserData();
      moveTarget();
    };
    initializeGame();
    
    // Cleanup on unmount
    return () => {
      // Any necessary cleanup can be done here
    };
  }, []);

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameStarted) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [gameStarted, timeLeft]);

  // Fetch current user data
  const fetchUserData = async () => {
    try {
      const response = await api.get('/api/users/me/');
      setUserData(response.data);
      fetchTopScore(response.data.id); // Fetch user's top score
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      alert('Failed to fetch user data. Please log in again.');
      navigate('/login'); // Redirect to login if user data cannot be fetched
    }
  };

  // Fetch user's top score
  const fetchTopScore = async (userId) => {
    try {
      const response = await api.get('/api/aim-game-scores/', {
        params: { 
          user: userId, // Filter scores by user ID
          ordering: '-score', 
          limit: 1 
        },
      });
      if (response.data.results && response.data.results.length > 0) {
        setTopScore(response.data.results[0].score);
      } else {
        setTopScore(0); // Default top score if none exist
      }
    } catch (error) {
      console.error('Failed to fetch top score:', error);
      setTopScore('N/A'); // Set to 'N/A' if there's an error
    }
  };

  // Move the target to a random position within the game area
  const moveTarget = () => {
    const gameArea = document.getElementById('game-area');
    if (gameArea) {
      const areaWidth = gameArea.offsetWidth;
      const areaHeight = gameArea.offsetHeight;
      const targetSize = 50; // Size of the target in pixels

      const maxLeft = areaWidth - targetSize;
      const maxTop = areaHeight - targetSize;

      const left = Math.floor(Math.random() * maxLeft);
      const top = Math.floor(Math.random() * maxTop);

      setTargetPosition({ top: `${top}px`, left: `${left}px` });
    }
  };

  // Handle clicking the target
  const handleTargetClick = () => {
    if (gameOver) {
      // Do not allow restarting the game by clicking the target
      return;
    }

    if (!gameStarted) {
      startGame();
    } else {
      setScore((prevScore) => prevScore + 1);
      moveTarget();
    }
  };

  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false); // Reset gameOver state
    setTimeLeft(INITIAL_TIME); // Reset timeLeft to initial value
    setScore(0); // Reset score
    setScoreSubmitted(false); // Allow score submission
    moveTarget(); // Move the target to a new position
  };

  // End the game
  const endGame = () => {
    if (scoreSubmitted) return;
    setGameStarted(false);
    setGameOver(true);
    submitScore();
  };

  // Submit the score to the server
  const submitScore = async () => {
    if (scoreSubmitted) return;
    setScoreSubmitted(true);
    try {
      await api.post('/api/aim-game-scores/', { score });
      fetchTopScore(userData.id); // Update top score after submission
    } catch (error) {
      console.error('Failed to submit score:', error);
      alert('Failed to submit score');
    }
  };

  // Reset the game to play again
  const resetGame = () => {
    setScore(0);
    setTimeLeft(INITIAL_TIME);
    setGameStarted(false);
    setGameOver(false);
    setScoreSubmitted(false);
    moveTarget();
  };

  // Navigate back to the previous page
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="aim-game-container">
      <div className="aim-game-content">
        <button className="back-button" onClick={handleBack}>Back</button>
        <h2>Aim Game</h2>
        <p className="top-score">Your Top Score: {topScore !== null ? topScore : 'Loading...'}</p>
        <div className="text-area">
          {gameOver ? (
            <p>Game Over! Your Score: {score}</p>
          ) : gameStarted ? (
            <div className="game-info">
              <p>Time Left: {timeLeft}s</p>
              <p>Score: {score}</p>
            </div>
          ) : (
            <p className="instructions">Click the target to start the game!</p>
          )}
        </div>
        <div id="game-area" className="game-area">
          {/* Render the target only if the game is not over */}
          {!gameOver && (
            <div
              className="target"
              style={{ top: targetPosition.top, left: targetPosition.left }}
              onClick={handleTargetClick}
            ></div>
          )}

          {/* Render the "Play Again" button centered when the game is over */}
          {gameOver && (
            <button className="play-again-button" onClick={resetGame}>
              Restart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AimGamePage;
