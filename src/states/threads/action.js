import { hideLoading, showLoading } from 'react-redux-loading-bar';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UPVOTE_THREAD: 'TOGGLE_UPVOTE_THREAD',
  TOGGLE_DOWNVOTE_THREAD: 'TOGGLE_DOWNVOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return { type: ActionType.RECEIVE_THREADS, payload: { threads } };
}

function addThreadActionCreator(thread) {
  return { type: ActionType.ADD_THREAD, payload: { thread } };
}

function toggleUpvoteThreadActionCreator({ threadId, userId }) {
  return { type: ActionType.TOGGLE_UPVOTE_THREAD, payload: { threadId, userId } };
}

function toggleDownvoteThreadActionCreator({ threadId, userId }) {
  return { type: ActionType.TOGGLE_DOWNVOTE_THREAD, payload: { threadId, userId } };
}

function neutralVoteThreadActionCreator({ threadId, userId }) {
  return { type: ActionType.NEUTRAL_VOTE_THREAD, payload: { threadId, userId } };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleUpvoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      // fallback
      dispatch(toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      // fallback
      dispatch(toggleUpvoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncNeutralVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpvoteThreadActionCreator,
  toggleDownvoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncNeutralVoteThread,
};
