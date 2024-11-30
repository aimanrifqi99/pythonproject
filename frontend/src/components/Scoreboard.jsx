import React from 'react';

function Scoreboard({ scores }) {
  if (!scores || scores.length === 0) {
    return <p>No scores available.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {scores.map((score, index) => (
          <tr key={score.id}>
            <td>{index + 1}</td>
            <td>{score.username}</td>
            <td>{score.score}</td>
            <td>{new Date(score.date_and_time).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Scoreboard;