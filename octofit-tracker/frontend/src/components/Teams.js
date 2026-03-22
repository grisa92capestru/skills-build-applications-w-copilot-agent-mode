import { useCallback, useEffect, useState } from 'react';

const resolveBaseUrl = () => {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

function Teams() {
  const [teams, setTeams] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const endpoint = `${resolveBaseUrl()}/api/teams/`;

  const fetchTeams = useCallback(async () => {
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
  }, [endpoint]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const filteredTeams = teams.filter((team) =>
    JSON.stringify(team).toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white d-flex flex-wrap justify-content-between align-items-center gap-2">
        <h2 className="h4 mb-0">Teams</h2>
        <div className="d-flex align-items-center gap-2">
          <a className="btn btn-link" href={endpoint} target="_blank" rel="noreferrer">API Link</a>
          <button type="button" className="btn btn-primary btn-sm" onClick={fetchTeams}>Refresh</button>
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
              placeholder="Filter teams"
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
                <th>Team</th>
                <th>ID</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team) => (
                <tr key={team._id || team.name}>
                  <td>{team.name || '-'}</td>
                  <td>{team._id || '-'}</td>
                  <td className="text-end">
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setSelectedTeam(team)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTeam && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Team Details</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedTeam(null)} />
                </div>
                <div className="modal-body">
                  <pre className="json-preview mb-0">{JSON.stringify(selectedTeam, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedTeam(null)}>Close</button>
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

export default Teams;
