/**
 * skenario pengujian asyncToggleUpVoteThread thunk:
 *
 * - asyncToggleUpVoteThread thunk
 *   - should dispatch action correctly when upvote is successful
 *   - should dispatch action and rollback correctly when upvote fails
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../../utils/api';
import { asyncToggleUpVoteThread, toggleUpvoteThreadActionCreator, toggleDownvoteThreadActionCreator } from './action';
import toast from 'react-hot-toast';

vi.mock('../../utils/api');
vi.mock('react-hot-toast');

describe('asyncToggleUpVoteThread thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when upvote is successful', async () => {
    // arrange
    const authUser = { id: 'user-1' };
    const threadId = 'thread-1';
    api.upVoteThread.mockResolvedValue();

    const dispatch = vi.fn();
    const getState = () => ({ authUser });

    // act
    await asyncToggleUpVoteThread(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(toggleUpvoteThreadActionCreator({ threadId, userId: authUser.id }));
    expect(api.upVoteThread).toHaveBeenCalledWith(threadId);
  });

  it('should dispatch action and rollback correctly when upvote fails', async () => {
    // arrange
    const authUser = { id: 'user-1' };
    const threadId = 'thread-1';
    const fakeError = new Error('Vote failed');
    api.upVoteThread.mockRejectedValue(fakeError);

    const dispatch = vi.fn();
    const getState = () => ({ authUser });

    // act
    await asyncToggleUpVoteThread(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(toggleUpvoteThreadActionCreator({ threadId, userId: authUser.id }));
    expect(api.upVoteThread).toHaveBeenCalledWith(threadId);
    expect(toast.error).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id }));
  });
});
