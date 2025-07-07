import { Link, useLocation } from 'react-router-dom';
import { Calendar, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          SIGAI
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link 
            to="/events" 
            className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`}
          >
            <Calendar size={18} />
            <span>Events</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 