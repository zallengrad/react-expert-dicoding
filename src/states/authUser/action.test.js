/**
 * skenario pengujian asyncSetAuthUser thunk:
 *
 * - asyncSetAuthUser thunk
 *   - should dispatch actions correctly when login is successful
 *   - should dispatch actions and call toast.error when login fails
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';
import toast from 'react-hot-toast';

vi.mock('../../utils/api');
vi.mock('react-hot-toast');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch actions correctly when login is successful', async () => {
    // arrange
    const fakeToken = 'token-123';
    const fakeAuthUser = { id: 'user-1', name: 'User Test', avatar: '' };
    api.login.mockResolvedValue(fakeToken);
    api.getOwnProfile.mockResolvedValue(fakeAuthUser);

    const dispatch = vi.fn();

    // act
    await asyncSetAuthUser({ email: 'test@example.com', password: 'password' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions and call toast.error when login fails', async () => {
    // arrange
    const fakeError = new Error('Login failed');
    api.login.mockRejectedValue(fakeError);

    const dispatch = vi.fn();

    // act
    await asyncSetAuthUser({ email: 'test@example.com', password: 'password' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(toast.error).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
