import { useEffect, useState } from 'react';

const resolveBaseUrl = () => {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

function Leaderboard() {
  const [leaderboardEntries, setLeaderboardEntries] = useState([]);
  const endpoint = `${resolveBaseUrl()}/api/leaderboard/`;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        console.log('Leaderboard endpoint:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Leaderboard fetched data:', data);

        const normalizedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setLeaderboardEntries(normalizedData);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        setLeaderboardEntries([]);
      }
    };

    fetchLeaderboard();
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {leaderboardEntries.map((entry) => (
          <li key={entry._id || `${entry.team}-${entry.points}`} className="list-group-item">
            <strong>{entry.team}</strong> - {entry.points} points
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
