import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigation({ authUser, signOut }) {
  return (
    <div className="bg-gray-800 border-b border-gray-700 py-4 px-6 flex justify-between items-center z-40 sticky top-1">
      <Link to="/" className="text-xl font-bold text-white tracking-widest">
        DICODING<span className="text-blue-500">FORUM</span>
      </Link>

      <nav>
        {authUser ? (
          <div className="flex items-center gap-4">
            <Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors">Leaderboard</Link>
            <div className="flex items-center gap-2 border-l border-gray-600 pl-4">
              <img src={authUser.avatar} alt={authUser.name} className="w-8 h-8 rounded-full border border-gray-600" />
              <button
                type="button"
                onClick={signOut}
                className="text-sm bg-gray-700 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition-colors"
                title="Sign Out"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/leaderboard" className="text-gray-300 hover:text-white transition-colors">Leaderboard</Link>
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Log in
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape),
  signOut: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  authUser: null,
};

export default Navigation;
