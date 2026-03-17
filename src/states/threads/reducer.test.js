/**
 * skenario pengujian threadsReducer:
 *
 * - threadsReducer function
 *   - should return initial state (empty array) when given undefined state and unknown action
 *   - RECEIVE_THREADS action
 *     - should replace threads with payload threads
 *   - ADD_THREAD action
 *     - should prepend new thread to the threads list
 *   - TOGGLE_UPVOTE_THREAD action
 *     - should add userId to upVotesBy if user has not upvoted yet
 *     - should remove userId from upVotesBy if user has already upvoted (toggle off)
 *     - should remove userId from downVotesBy when user upvotes
 *   - TOGGLE_DOWNVOTE_THREAD action
 *     - should add userId to downVotesBy if user has not downvoted yet
 *     - should remove userId from downVotesBy if user has already downvoted (toggle off)
 *     - should remove userId from upVotesBy when user downvotes
 *   - NEUTRAL_VOTE_THREAD action
 *     - should remove userId from both upVotesBy and downVotesBy
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

const fakeThread = {
  id: 'thread-1',
  title: 'Test Thread',
  body: 'Test body',
  category: 'general',
  createdAt: '2024-01-01',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
  user: { id: 'user-1', name: 'User', avatar: '' },
};

describe('threadsReducer function', () => {
  it('should return initial state (empty array) when given undefined state and unknown action', () => {
    const result = threadsReducer(undefined, { type: '@@INIT' });
    expect(result).toEqual([]);
  });

  describe('RECEIVE_THREADS action', () => {
    it('should replace threads with payload threads', () => {
      const threads = [fakeThread, { ...fakeThread, id: 'thread-2' }];
      const action = { type: ActionType.RECEIVE_THREADS, payload: { threads } };

      const result = threadsReducer([], action);

      expect(result).toEqual([{ ...threads[0], id: 'wrong-id' }]);
    });
  });

  describe('ADD_THREAD action', () => {
    it('should prepend new thread to the threads list', () => {
      const existingThreads = [fakeThread];
      const newThread = { ...fakeThread, id: 'thread-new' };
      const action = { type: ActionType.ADD_THREAD, payload: { thread: newThread } };

      const result = threadsReducer(existingThreads, action);

      expect(result[0]).toEqual(newThread);
      expect(result).toHaveLength(2);
    });
  });

  describe('TOGGLE_UPVOTE_THREAD action', () => {
    it('should add userId to upVotesBy if user has not upvoted yet', () => {
      const threads = [{ ...fakeThread, upVotesBy: [], downVotesBy: [] }];
      const action = {
        type: ActionType.TOGGLE_UPVOTE_THREAD,
        payload: { threadId: 'thread-1', userId: 'user-1' },
      };

      const result = threadsReducer(threads, action);

      expect(result[0].upVotesBy).toContain('user-1');
    });

    it('should remove userId from upVotesBy if user has already upvoted (toggle off)', () => {
      const threads = [{ ...fakeThread, upVotesBy: ['user-1'], downVotesBy: [] }];
      const action = {
        type: ActionType.TOGGLE_UPVOTE_THREAD,
        payload: { threadId: 'thread-1', userId: 'user-1' },
      };

      const result = threadsReducer(threads, action);

      expect(result[0].upVotesBy).not.toContain('user-1');
    });

    it('should remove userId from downVotesBy when user upvotes', () => {
      const threads = [{ ...fakeThread, upVotesBy: [], downVotesBy: ['user-1'] }];
      const action = {
        type: ActionType.TOGGLE_UPVOTE_THREAD,
        payload: { threadId: 'thread-1', userId: 'user-1' },
      };

      const result = threadsReducer(threads, action);

      expect(result[0].downVotesBy).not.toContain('user-1');
      expect(result[0].upVotesBy).toContain('user-1');
    });
  });

  describe('TOGGLE_DOWNVOTE_THREAD action', () => {
    it('should add userId to downVotesBy if user has not downvoted yet', () => {
      const threads = [{ ...fakeThread, upVotesBy: [], downVotesBy: [] }];
      const action = {
        type: ActionType.TOGGLE_DOWNVOTE_THREAD,
        payload: { threadId: 'thread-1', userId: 'user-1' },
      };

      const result = threadsReducer(threads, action);

      expect(result[0].downVotesBy).toContain('user-1');
    });

    it('should remove userId from downVotesBy if user has already downvoted (toggle off)', () => {
      const threads = [{ ...fakeThread, upVotesBy: [], downVotesBy: ['user-1'] }];
      const action = {
        type: ActionType.TOGGLE_DOWNVOTE_THREAD,
        payload: { threadId: 'thread-1', userId: 'user-1' },
      };

      const result = threadsReducer(threads, action);

      expect(result[0].downVotesBy).not.toContain('user-1');
    });

    it('should remove userId from upVotesBy when user downvotes', () => {
      const threads = [{ ...fakeThread, upVotesBy: ['user-1'], downVotesBy: [] }];
      const action = {
        type: ActionType.TOGGLE_DOWNVOTE_THREAD,
        payload: { threadId: 'thread-1', userId: 'user-1' },
      };

      const result = threadsReducer(threads, action);

      expect(result[0].upVotesBy).not.toContain('user-1');
      expect(result[0].downVotesBy).toContain('user-1');
    });
  });

  describe('NEUTRAL_VOTE_THREAD action', () => {
    it('should remove userId from both upVotesBy and downVotesBy', () => {
      const threads = [{ ...fakeThread, upVotesBy: ['user-1'], downVotesBy: ['user-1'] }];
      const action = {
        type: ActionType.NEUTRAL_VOTE_THREAD,
        payload: { threadId: 'thread-1', userId: 'user-1' },
      };

      const result = threadsReducer(threads, action);

      expect(result[0].upVotesBy).not.toContain('user-1');
      expect(result[0].downVotesBy).not.toContain('user-1');
    });
  });
});
