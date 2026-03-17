import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

// Tambahkan isLoading di parameter
function ThreadList({ threads, authUser, upVote, downVote, neutralVote, isLoading }) {
  // Jika sedang loading, tampilkan skeleton UI
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-gray-800 p-6 rounded-xl border border-gray-700 animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/6"></div>
              </div>
            </div>
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  // Jika tidak loading tapi data kosong
  if (!threads || threads.length === 0) {
    return (
      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 text-center">
        <p className="text-gray-400">No threads found. Be the first to start a discussion!</p>
      </div>
    );
  }

  // Jika data tersedia
  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          authUser={authUser}
          upVote={upVote}
          downVote={downVote}
          neutralVote={neutralVote}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  authUser: PropTypes.object,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  neutralVote: PropTypes.func,
  isLoading: PropTypes.bool, // Validasi tipe props baru
};

ThreadList.defaultProps = {
  authUser: null,
  upVote: () => {},
  downVote: () => {},
  neutralVote: () => {},
  isLoading: false, // Default value props baru
};

export default ThreadList;