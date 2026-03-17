import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncNeutralVoteThread
} from '../states/threads/action';
import ThreadList from '../components/ThreadList';

function HomePage() {
  const threads = useSelector((states) => states.threads) || [];
  const users = useSelector((states) => states.users) || [];
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  const [filterCategory, setFilterCategory] = useState('');
  // Tambahkan state isLoading dengan nilai awal true
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Buat fungsi async untuk menunggu proses fetch selesai
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(asyncPopulateUsersAndThreads());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const categories = Array.from(new Set(threads.map((t) => t.category)));

  const onCategoryClick = (category) => {
    setFilterCategory(category === filterCategory ? '' : category);
  };

  const threadList = threads
    .filter((thread) => (filterCategory ? thread.category === filterCategory : true))
    .map((thread) => ({
      ...thread,
      user: users.find((user) => user.id === thread.ownerId) || {},
      authUser: authUser ? authUser.id : null,
    }));

  const onUpVote = (id) => dispatch(asyncToggleUpVoteThread(id));
  const onDownVote = (id) => dispatch(asyncToggleDownVoteThread(id));
  const onNeutralVote = (id) => dispatch(asyncNeutralVoteThread(id));

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 relative min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Available Threads</h1>
        <p className="text-gray-400">Join the discussion, explore your topics.</p>
      </header>

      {categories.length > 0 && !isLoading && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryClick(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                filterCategory === category
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-gray-400'
              }`}
            >
              #{category}
            </button>
          ))}
        </div>
      )}

      {/* Lempar props isLoading ke ThreadList */}
      <ThreadList
        threads={threadList}
        authUser={authUser}
        upVote={onUpVote}
        downVote={onDownVote}
        neutralVote={onNeutralVote}
        isLoading={isLoading}
      />

      {authUser && (
        <Link
          to="/new"
          className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex justify-center items-center shadow-lg transition-transform hover:scale-105"
          title="Create New Thread"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      )}
    </div>
  );
}

export default HomePage;