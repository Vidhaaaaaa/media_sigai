import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MediaPage from './pages/MediaPage.jsx';
import Navigation from './components/Navbar.jsx';
function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <Routes>
          <Route path="/media" element={<MediaPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;