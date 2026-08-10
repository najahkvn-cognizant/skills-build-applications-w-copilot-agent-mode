import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand">OctoFit Tracker</span>
        <div className="navbar-nav ms-auto">
          <NavLink className="nav-link" to="/users/">Users</NavLink>
          <NavLink className="nav-link" to="/teams/">Teams</NavLink>
          <NavLink className="nav-link" to="/activities/">Activities</NavLink>
          <NavLink className="nav-link" to="/leaderboard/">Leaderboard</NavLink>
          <NavLink className="nav-link" to="/workouts/">Workouts</NavLink>
        </div>
      </nav>

      <main className="container-fluid py-4">
        <Routes>
          <Route path="/users/" element={<Users />} />
          <Route path="/teams/" element={<Teams />} />
          <Route path="/activities/" element={<Activities />} />
          <Route path="/leaderboard/" element={<Leaderboard />} />
          <Route path="/workouts/" element={<Workouts />} />
          <Route path="/" element={<Users />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App
