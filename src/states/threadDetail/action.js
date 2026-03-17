import { hideLoading, showLoading } from 'react-redux-loading-bar';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_UPVOTE_THREAD_DETAIL: 'TOGGLE_UPVOTE_THREAD_DETAIL',
  TOGGLE_DOWNVOTE_THREAD_DETAIL: 'TOGGLE_DOWNVOTE_THREAD_DETAIL',
  NEUTRAL_VOTE_THREAD_DETAIL: 'NEUTRAL_VOTE_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT: 'NEUTRAL_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return { type: ActionType.RECEIVE_THREAD_DETAIL, payload: { threadDetail } };
}

function clearThreadDetailActionCreator() {
  return { type: ActionType.CLEAR_THREAD_DETAIL };
}

function addCommentActionCreator(comment) {
  return { type: ActionType.ADD_COMMENT, payload: { comment } };
}

function toggleUpvoteThreadDetailActionCreator(userId) {
  return { type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL, payload: { userId } };
}

function toggleDownvoteThreadDetailActionCreator(userId) {
  return { type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL, payload: { userId } };
}

function neutralVoteThreadDetailActionCreator(userId) {
  return { type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL, payload: { userId } };
}

function toggleUpvoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.TOGGLE_UPVOTE_COMMENT, payload: { commentId, userId } };
}

function toggleDownvoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.TOGGLE_DOWNVOTE_COMMENT, payload: { commentId, userId } };
}

function neutralVoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.NEUTRAL_VOTE_COMMENT, payload: { commentId, userId } };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

// Thread Detail Votes
function asyncToggleUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleUpvoteThreadDetailActionCreator(authUser.id));
    try {
      await api.upVoteThread(threadDetail.id);
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleDownvoteThreadDetailActionCreator(authUser.id));
    }
  };
}

function asyncToggleDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleDownvoteThreadDetailActionCreator(authUser.id));
    try {
      await api.downVoteThread(threadDetail.id);
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleUpvoteThreadDetailActionCreator(authUser.id));
    }
  };
}

function asyncNeutralVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(neutralVoteThreadDetailActionCreator(authUser.id));
    try {
      await api.neutralVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

// Comment Votes
function asyncToggleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleUpvoteCommentActionCreator({ commentId, userId: authUser.id }));
    try {
      await api.upVoteComment(threadDetail.id, commentId);
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleDownvoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncToggleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleDownvoteCommentActionCreator({ commentId, userId: authUser.id }));
    try {
      await api.downVoteComment(threadDetail.id, commentId);
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleUpvoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncNeutralVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(neutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
    try {
      await api.neutralVoteComment(threadDetail.id, commentId);
    } catch (error) {
      toast.error(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncNeutralVoteComment,
};
