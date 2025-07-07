import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MediaPage from './Pages/MediaPage.jsx';
import Navigation from './components/navbar.jsx';
function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <Routes>
          <Route path="/" element={<div className="home-container">Welcome to SIGAI</div>} />
          <Route path="/events" element={<div className="events-page">Events Page Coming Soon</div>} />
          <Route path="/media" element={<MediaPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;