import { useEffect, useState } from 'react';

const resolveBaseUrl = () => {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const endpoint = `${resolveBaseUrl()}/api/activities/`;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log('Activities endpoint:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Activities fetched data:', data);

        const normalizedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setActivities(normalizedData);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
        setActivities([]);
      }
    };

    fetchActivities();
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity._id || `${activity.user}-${activity.type}-${activity.date}`} className="list-group-item">
            <strong>{activity.user}</strong> - {activity.type} ({activity.duration} min)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
