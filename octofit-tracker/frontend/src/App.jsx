import { Activity, Dumbbell, Trophy, UserRound, UsersRound } from 'lucide-react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './dashboard.css'

const navigation = [
  { to: '/activities', label: 'Activities', Icon: Activity },
  { to: '/leaderboard', label: 'Leaderboard', Icon: Trophy },
  { to: '/teams', label: 'Teams', Icon: UsersRound },
  { to: '/users', label: 'Members', Icon: UserRound },
  { to: '/workouts', label: 'Workouts', Icon: Dumbbell },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand-lockup" to="/activities" aria-label="OctoFit home">
          <img className="brand-logo" src={logo} alt="" />
          <span className="brand-name">octofit<span>tracker</span></span>
        </NavLink>

        <div className="nav-caption">YOUR TRACKER</div>
        <nav className="side-navigation" aria-label="Main navigation">
          {navigation.map(({ to, label, Icon }) => (
            <NavLink className="side-link" key={to} to={to}>
              <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-note">
          <span className="sidebar-note-mark" aria-hidden="true">O</span>
          <p>Small steps.<br />Stronger together.</p>
        </div>
      </aside>

      <main className="workspace">
        <header className="workspace-bar">
          <span className="workspace-label">OCTOFIT <span>/</span> MOVEMENT</span>
          <span className="api-indicator">
            <span className="api-indicator-dot" aria-hidden="true" />
            {import.meta.env.VITE_CODESPACE_NAME ? 'CODESPACES API' : 'LOCAL API'}
          </span>
        </header>

        <div className="workspace-content">
          <Routes>
            <Route path="/" element={<Navigate replace to="/activities" />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate replace to="/activities" />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
