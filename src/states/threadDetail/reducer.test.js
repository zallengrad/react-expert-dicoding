/**
 * skenario pengujian threadDetailReducer:
 *
 * - threadDetailReducer function
 *   - should return null as initial state when given undefined and unknown action
 *   - RECEIVE_THREAD_DETAIL action
 *     - should store the received thread detail in state
 *   - CLEAR_THREAD_DETAIL action
 *     - should return null, clearing the thread detail
 *   - ADD_COMMENT action
 *     - should prepend new comment to the comments array
 *   - TOGGLE_UPVOTE_THREAD_DETAIL action
 *     - should add userId to upVotesBy if not yet upvoted
 *     - should remove userId from upVotesBy if already upvoted (toggle off)
 *     - should remove userId from downVotesBy when upvoting
 *   - TOGGLE_DOWNVOTE_THREAD_DETAIL action
 *     - should add userId to downVotesBy if not yet downvoted
 *     - should remove userId from downVotesBy if already downvoted (toggle off)
 *     - should remove userId from upVotesBy when downvoting
 *   - NEUTRAL_VOTE_THREAD_DETAIL action
 *     - should remove userId from both upVotesBy and downVotesBy
 *   - TOGGLE_UPVOTE_COMMENT action
 *     - should toggle upVote on the correct comment
 *   - TOGGLE_DOWNVOTE_COMMENT action
 *     - should toggle downVote on the correct comment and clear from upVotes
 *   - NEUTRAL_VOTE_COMMENT action
 *     - should remove userId from both comment vote arrays
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

const fakeComment = {
  id: 'comment-1',
  content: 'Test comment',
  createdAt: '2024-01-01',
  upVotesBy: [],
  downVotesBy: [],
  owner: { id: 'user-1', name: 'User', avatar: '' },
};

const fakeThreadDetail = {
  id: 'thread-1',
  title: 'Test Thread',
  body: 'Test body',
  category: 'general',
  createdAt: '2024-01-01',
  upVotesBy: [],
  downVotesBy: [],
  comments: [fakeComment],
  owner: { id: 'user-1', name: 'User', avatar: '' },
};

describe('threadDetailReducer function', () => {
  it('should return null as initial state when given undefined and unknown action', () => {
    const result = threadDetailReducer(undefined, { type: '@@INIT' });
    expect(result).toBeNull();
  });

  describe('RECEIVE_THREAD_DETAIL action', () => {
    it('should store the received thread detail in state', () => {
      const action = {
        type: ActionType.RECEIVE_THREAD_DETAIL,
        payload: { threadDetail: fakeThreadDetail },
      };

      const result = threadDetailReducer(null, action);

      expect(result).toEqual(fakeThreadDetail);
    });
  });

  describe('CLEAR_THREAD_DETAIL action', () => {
    it('should return null, clearing the thread detail', () => {
      const action = { type: ActionType.CLEAR_THREAD_DETAIL };

      const result = threadDetailReducer(fakeThreadDetail, action);

      expect(result).toBeNull();
    });
  });

  describe('ADD_COMMENT action', () => {
    it('should prepend new comment to the comments array', () => {
      const newComment = { ...fakeComment, id: 'comment-new', content: 'New comment' };
      const action = { type: ActionType.ADD_COMMENT, payload: { comment: newComment } };

      const result = threadDetailReducer(fakeThreadDetail, action);

      expect(result.comments[0]).toEqual(newComment);
      expect(result.comments).toHaveLength(2);
    });
  });

  describe('TOGGLE_UPVOTE_THREAD_DETAIL action', () => {
    it('should add userId to upVotesBy if not yet upvoted', () => {
      const state = { ...fakeThreadDetail, upVotesBy: [], downVotesBy: [] };
      const action = {
        type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
        payload: { userId: 'user-1' },
      };

      const result = threadDetailReducer(state, action);

      expect(result.upVotesBy).toContain('user-1');
    });

    it('should remove userId from upVotesBy if already upvoted (toggle off)', () => {
      const state = { ...fakeThreadDetail, upVotesBy: ['user-1'], downVotesBy: [] };
      const action = {
        type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
        payload: { userId: 'user-1' },
      };

      const result = threadDetailReducer(state, action);

      expect(result.upVotesBy).not.toContain('user-1');
    });

    it('should remove userId from downVotesBy when upvoting', () => {
      const state = { ...fakeThreadDetail, upVotesBy: [], downVotesBy: ['user-1'] };
      const action = {
        type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
        payload: { userId: 'user-1' },
      };

      const result = threadDetailReducer(state, action);

      expect(result.downVotesBy).not.toContain('user-1');
      expect(result.upVotesBy).toContain('user-1');
    });
  });

  describe('TOGGLE_DOWNVOTE_THREAD_DETAIL action', () => {
    it('should add userId to downVotesBy if not yet downvoted', () => {
      const state = { ...fakeThreadDetail, upVotesBy: [], downVotesBy: [] };
      const action = {
        type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL,
        payload: { userId: 'user-1' },
      };

      const result = threadDetailReducer(state, action);

      expect(result.downVotesBy).toContain('user-1');
    });

    it('should remove userId from downVotesBy if already downvoted (toggle off)', () => {
      const state = { ...fakeThreadDetail, upVotesBy: [], downVotesBy: ['user-1'] };
      const action = {
        type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL,
        payload: { userId: 'user-1' },
      };

      const result = threadDetailReducer(state, action);

      expect(result.downVotesBy).not.toContain('user-1');
    });

    it('should remove userId from upVotesBy when downvoting', () => {
      const state = { ...fakeThreadDetail, upVotesBy: ['user-1'], downVotesBy: [] };
      const action = {
        type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL,
        payload: { userId: 'user-1' },
      };

      const result = threadDetailReducer(state, action);

      expect(result.upVotesBy).not.toContain('user-1');
      expect(result.downVotesBy).toContain('user-1');
    });
  });

  describe('NEUTRAL_VOTE_THREAD_DETAIL action', () => {
    it('should remove userId from both upVotesBy and downVotesBy', () => {
      const state = { ...fakeThreadDetail, upVotesBy: ['user-1'], downVotesBy: ['user-1'] };
      const action = {
        type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
        payload: { userId: 'user-1' },
      };

      const result = threadDetailReducer(state, action);

      expect(result.upVotesBy).not.toContain('user-1');
      expect(result.downVotesBy).not.toContain('user-1');
    });
  });

  describe('TOGGLE_UPVOTE_COMMENT action', () => {
    it('should toggle upVote on the correct comment', () => {
      const state = {
        ...fakeThreadDetail,
        comments: [{ ...fakeComment, upVotesBy: [], downVotesBy: [] }],
      };
      const action = {
        type: ActionType.TOGGLE_UPVOTE_COMMENT,
        payload: { commentId: 'comment-1', userId: 'user-1' },
      };

      const result = threadDetailReducer(state, action);

      expect(result.comments[0].upVotesBy).toContain('user-1');
    });
  });

  describe('TOGGLE_DOWNVOTE_COMMENT action', () => {
    it('should toggle downVote on the correct comment and clear from upVotes', () => {
      const state = {
        ...fakeThreadDetail,
        comments: [{ ...fakeComment, upVotesBy: ['user-1'], downVotesBy: [] }],
      };
      const action = {
        type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
        payload: { commentId: 'comment-1', userId: 'user-1' },
      };

      const result = threadDetailReducer(state, action);

      expect(result.comments[0].upVotesBy).not.toContain('user-1');
      expect(result.comments[0].downVotesBy).toContain('user-1');
    });
  });

  describe('NEUTRAL_VOTE_COMMENT action', () => {
    it('should remove userId from both comment vote arrays', () => {
      const state = {
        ...fakeThreadDetail,
        comments: [{ ...fakeComment, upVotesBy: ['user-1'], downVotesBy: ['user-1'] }],
      };
      const action = {
        type: ActionType.NEUTRAL_VOTE_COMMENT,
        payload: { commentId: 'comment-1', userId: 'user-1' },
      };

      const result = threadDetailReducer(state, action);

      expect(result.comments[0].upVotesBy).not.toContain('user-1');
      expect(result.comments[0].downVotesBy).not.toContain('user-1');
    });
  });
});
