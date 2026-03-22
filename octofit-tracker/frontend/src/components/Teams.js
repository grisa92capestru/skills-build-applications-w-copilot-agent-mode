import { useEffect, useState } from 'react';

const resolveBaseUrl = () => {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

function Teams() {
  const [teams, setTeams] = useState([]);
  const endpoint = `${resolveBaseUrl()}/api/teams/`;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log('Teams endpoint:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Teams fetched data:', data);

        const normalizedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setTeams(normalizedData);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
        setTeams([]);
      }
    };

    fetchTeams();
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <ul className="list-group">
        {teams.map((team) => (
          <li key={team._id || team.name} className="list-group-item">
            {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
