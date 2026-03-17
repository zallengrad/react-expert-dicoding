import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardPage() {
  const leaderboards = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Active Users Leaderboard</h1>
        <p className="text-gray-400">Top contributing users holding the highest scores.</p>
      </header>

      <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-xl">
        <div className="flex justify-between p-4 md:px-8 border-b border-gray-700 bg-gray-900/50 text-gray-400 font-semibold text-sm tracking-wider uppercase">
          <span>User</span>
          <span>Score</span>
        </div>

        <div className="divide-y divide-gray-700">
          {leaderboards.map((item, index) => (
            <div key={item.user.id} className="flex justify-between items-center p-4 md:px-8 hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 flex justify-center">
                  <span className={`text-xl font-bold ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-amber-600' : 'text-gray-500'}`}>
                    #{index + 1}
                  </span>
                </div>
                <img src={item.user.avatar} alt={item.user.name} className="w-10 h-10 rounded-full border border-gray-600" />
                <span className="text-white font-medium">{item.user.name}</span>
              </div>
              <span className="text-2xl font-mono text-blue-400">{item.score}</span>
            </div>
          ))}

          {leaderboards.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Loading leaderboard...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;
