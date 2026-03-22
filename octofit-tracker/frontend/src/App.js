import './App.css';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-semibold">OctoFit Tracker</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofitNavbar"
            aria-controls="octofitNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="octofitNavbar">
            <div className="navbar-nav ms-auto">
              <NavLink className="nav-link" to="/users">Users</NavLink>
              <NavLink className="nav-link" to="/teams">Teams</NavLink>
              <NavLink className="nav-link" to="/activities">Activities</NavLink>
              <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
              <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
            </div>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body d-flex flex-wrap justify-content-between align-items-center gap-2">
            <div>
              <h1 className="h3 mb-1">Fitness Dashboard</h1>
              <p className="text-muted mb-0">Track users, teams, activities, leaderboard standings, and workouts.</p>
            </div>
            <div>
              <NavLink className="btn btn-outline-primary btn-sm" to="/users">Go to Users</NavLink>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
