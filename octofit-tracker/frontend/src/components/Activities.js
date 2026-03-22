import { useCallback, useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  const fetchActivities = useCallback(async () => {
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
  }, [endpoint]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const filteredActivities = activities.filter((activity) =>
    JSON.stringify(activity).toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white d-flex flex-wrap justify-content-between align-items-center gap-2">
        <h2 className="h4 mb-0">Activities</h2>
        <div className="d-flex align-items-center gap-2">
          <a className="btn btn-link" href={endpoint} target="_blank" rel="noreferrer">API Link</a>
          <button type="button" className="btn btn-primary btn-sm" onClick={fetchActivities}>Refresh</button>
        </div>
      </div>
      <div className="card-body">
        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-8">
            <input
              className="form-control"
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Filter activities"
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-outline-secondary">Filter</button>
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Date</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity) => (
                <tr key={activity._id || `${activity.user}-${activity.type}-${activity.date}`}>
                  <td>{activity.user || '-'}</td>
                  <td>{activity.type || '-'}</td>
                  <td>{activity.duration ?? '-'}</td>
                  <td>{activity.date || '-'}</td>
                  <td className="text-end">
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setSelectedActivity(activity)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedActivity && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Activity Details</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedActivity(null)} />
                </div>
                <div className="modal-body">
                  <pre className="json-preview mb-0">{JSON.stringify(selectedActivity, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedActivity(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show" />
        </>
      )}
    </div>
  );
}

export default Activities;
