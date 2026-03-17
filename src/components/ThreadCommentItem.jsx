import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../utils/formatter';

function ThreadCommentItem({ id, content, createdAt, owner, upVotesBy, downVotesBy, authUser, upVote, downVote, neutralVote }) {
  const isUpVoted = authUser && upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && downVotesBy.includes(authUser.id);

  const onUpVoteClick = () => {
    if (!authUser) return alert('Please login to vote');
    if (isUpVoted) {
      neutralVote(id);
    } else {
      upVote(id);
    }
  };

  const onDownVoteClick = () => {
    if (!authUser) return alert('Please login to vote');
    if (isDownVoted) {
      neutralVote(id);
    } else {
      downVote(id);
    }
  };

  return (
    <div className="border-b border-gray-700 py-4 last:border-0">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <img src={owner.avatar} alt={owner.name} className="w-8 h-8 rounded-full bg-gray-700 object-cover" />
          <div>
            <p className="text-white font-medium text-sm">{owner.name}</p>
            <p className="text-xs text-gray-500">{postedAt(createdAt)}</p>
          </div>
        </div>
      </div>
      <div className="text-gray-300 text-sm mb-3" dangerouslySetInnerHTML={{ __html: content }} />
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <button type="button" onClick={onUpVoteClick} className={`hover:text-green-400 transition-colors ${isUpVoted ? 'text-green-500' : ''}`}>
             ▲ {upVotesBy.length}
          </button>
          <button type="button" onClick={onDownVoteClick} className={`hover:text-red-400 transition-colors ${isDownVoted ? 'text-red-500' : ''}`}>
             ▼ {downVotesBy.length}
          </button>
        </div>
      </div>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadCommentItem.propTypes = {
  ...commentItemShape,
  authUser: PropTypes.object,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  neutralVote: PropTypes.func,
};

ThreadCommentItem.defaultProps = {
  authUser: null,
  upVote: () => {},
  downVote: () => {},
  neutralVote: () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export { commentItemShape };
export default ThreadCommentItem;
