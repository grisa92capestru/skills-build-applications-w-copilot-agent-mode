import { useCallback, useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const endpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  const fetchWorkouts = useCallback(async () => {
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
  }, [endpoint]);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const filteredWorkouts = workouts.filter((workout) =>
    JSON.stringify(workout).toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white d-flex flex-wrap justify-content-between align-items-center gap-2">
        <h2 className="h4 mb-0">Workouts</h2>
        <div className="d-flex align-items-center gap-2">
          <a className="btn btn-link" href={endpoint} target="_blank" rel="noreferrer">API Link</a>
          <button type="button" className="btn btn-primary btn-sm" onClick={fetchWorkouts}>Refresh</button>
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
              placeholder="Filter workouts"
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
                <th>Name</th>
                <th>Difficulty</th>
                <th>Description</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkouts.map((workout) => (
                <tr key={workout._id || workout.name}>
                  <td>{workout.name || '-'}</td>
                  <td>{workout.difficulty || '-'}</td>
                  <td>{workout.description || '-'}</td>
                  <td className="text-end">
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setSelectedWorkout(workout)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedWorkout && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Workout Details</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedWorkout(null)} />
                </div>
                <div className="modal-body">
                  <pre className="json-preview mb-0">{JSON.stringify(selectedWorkout, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedWorkout(null)}>Close</button>
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

export default Workouts;
