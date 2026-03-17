import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncNeutralVoteComment
} from '../states/threadDetail/action';
import ThreadCommentItem from '../components/ThreadCommentItem';
import CommentInput from '../components/CommentInput';
import { postedAt } from '../utils/formatter';

function DetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((states) => states.threadDetail);
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 flex justify-center items-center h-48">
        <p className="text-gray-400">Loading thread...</p>
      </div>
    );
  }

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  const isUpVoted = authUser && threadDetail.upVotesBy.includes(authUser.id);
  const isDownVoted = authUser && threadDetail.downVotesBy.includes(authUser.id);

  const onUpVoteClick = () => {
    if (!authUser) return alert('Please login to vote');
    if (isUpVoted) dispatch(asyncNeutralVoteThreadDetail());
    else dispatch(asyncToggleUpVoteThreadDetail());
  };

  const onDownVoteClick = () => {
    if (!authUser) return alert('Please login to vote');
    if (isDownVoted) dispatch(asyncNeutralVoteThreadDetail());
    else dispatch(asyncToggleDownVoteThreadDetail());
  };

  const onCommentUpVote = (commentId) => dispatch(asyncToggleUpVoteComment(commentId));
  const onCommentDownVote = (commentId) => dispatch(asyncToggleDownVoteComment(commentId));
  const onCommentNeutralVote = (commentId) => dispatch(asyncNeutralVoteComment(commentId));

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-gray-800 p-6 md:p-8 rounded-2xl border border-gray-700 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <img src={threadDetail.owner.avatar} alt={threadDetail.owner.name} className="w-12 h-12 rounded-full border border-gray-600" />
            <div>
              <p className="text-white font-bold text-lg">{threadDetail.owner.name}</p>
              <p className="text-sm text-gray-400">{postedAt(threadDetail.createdAt)}</p>
            </div>
          </div>
          <span className="text-sm font-mono px-4 py-1.5 bg-blue-900/50 text-blue-300 rounded-full border border-blue-800">
            #{threadDetail.category}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-6">{threadDetail.title}</h1>
        <div className="text-gray-300 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: threadDetail.body }} />

        <div className="flex items-center gap-6 text-gray-400 border-t border-gray-700 pt-6">
          <div className="flex items-center gap-3">
            <button type="button" onClick={onUpVoteClick} className={`hover:text-green-400 text-lg transition-colors ${isUpVoted ? 'text-green-500' : ''}`}>
               ▲ {threadDetail.upVotesBy.length}
            </button>
            <button type="button" onClick={onDownVoteClick} className={`hover:text-red-400 text-lg transition-colors ${isDownVoted ? 'text-red-500' : ''}`}>
               ▼ {threadDetail.downVotesBy.length}
            </button>
          </div>
          <div className="flex items-center gap-2">
             💬 {threadDetail.comments.length} comments
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 md:p-8 rounded-2xl border border-gray-700">
        <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-4 mb-4">
          Comments ({threadDetail.comments.length})
        </h2>

        {authUser ? (
          <CommentInput addComment={onAddComment} />
        ) : (
          <p className="text-gray-400 mb-8 p-4 bg-gray-900 rounded-lg text-center">
            You must be logged in to leave a comment.
          </p>
        )}

        <div className="flex flex-col">
          {threadDetail.comments.map((comment) => (
            <ThreadCommentItem
              key={comment.id}
              {...comment}
              authUser={authUser}
              upVote={onCommentUpVote}
              downVote={onCommentDownVote}
              neutralVote={onCommentNeutralVote}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
