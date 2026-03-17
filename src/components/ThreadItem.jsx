import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { threadItemShape } from './shapes';
import { postedAt } from '../utils/formatter';

function ThreadItem({ id, title, body, category, createdAt, upVotesBy, downVotesBy, totalComments, user, authUser, upVote, downVote, neutralVote }) {
  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const onUpVoteClick = (e) => {
    e.preventDefault();
    if (!authUser) return alert('Please login to vote');
    if (isUpVoted) {
      neutralVote(id);
    } else {
      upVote(id);
    }
  };

  const onDownVoteClick = (e) => {
    e.preventDefault();
    if (!authUser) return alert('Please login to vote');
    if (isDownVoted) {
      neutralVote(id);
    } else {
      downVote(id);
    }
  };

  return (
    <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-gray-700 object-cover" />
          <div>
            <p className="text-white font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{postedAt(createdAt)}</p>
          </div>
        </div>
        <span className="text-xs font-mono px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full border border-blue-800">
          #{category}
        </span>
      </div>

      <Link to={`/threads/${id}`} className="block group">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <div className="text-gray-400 text-sm line-clamp-3 mb-4" dangerouslySetInnerHTML={{ __html: body }} />
      </Link>

      <div className="flex items-center gap-6 text-sm text-gray-400 border-t border-gray-700 pt-4 mt-2">
        <div className="flex items-center gap-2">
          <button type="button" onClick={onUpVoteClick} className={`hover:text-green-400 transition-colors ${isUpVoted ? 'text-green-500' : ''}`}>
             ▲ {upVotesBy.length}
          </button>
          <button type="button" onClick={onDownVoteClick} className={`hover:text-red-400 transition-colors ${isDownVoted ? 'text-red-500' : ''}`}>
             ▼ {downVotesBy.length}
          </button>
        </div>
        <div className="flex items-center gap-2">
           💬 {totalComments} comments
        </div>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  ...threadItemShape,
  authUser: PropTypes.object,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  neutralVote: PropTypes.func,
};

ThreadItem.defaultProps = {
  authUser: null,
  upVote: () => {},
  downVote: () => {},
  neutralVote: () => {},
};

export default ThreadItem;
