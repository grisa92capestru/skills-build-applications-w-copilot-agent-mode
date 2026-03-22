import { useEffect, useState } from 'react';

const resolveBaseUrl = () => {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const endpoint = `${resolveBaseUrl()}/api/workouts/`;

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        console.log('Workouts endpoint:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Workouts fetched data:', data);

        const normalizedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setWorkouts(normalizedData);
      } catch (error) {
        console.error('Failed to fetch workouts:', error);
        setWorkouts([]);
      }
    };

    fetchWorkouts();
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <ul className="list-group">
        {workouts.map((workout) => (
          <li key={workout._id || workout.name} className="list-group-item">
            <strong>{workout.name}</strong> - {workout.difficulty}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
