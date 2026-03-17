/**
 * skenario pengujian ThreadItem:
 *
 * - ThreadItem component
 *   - should render thread details correctly
 *   - should call upVote handler when upvote button is clicked and not yet upvoted
 *   - should call neutralVote handler when upvote button is clicked and already upvoted
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ThreadItem from './ThreadItem';

const fakeThread = {
  id: 'thread-1',
  title: 'Test Title',
  body: 'Test Body',
  category: 'testcat',
  createdAt: '2024-01-01T00:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 5,
  user: {
    id: 'user-1',
    name: 'Author Name',
    avatar: 'https://avatar.png',
  },
};

describe('ThreadItem component', () => {
  it('should render thread details correctly', () => {
    // arrange
    render(
      <MemoryRouter>
        <ThreadItem {...fakeThread} />
      </MemoryRouter>
    );

    // assert
    expect(screen.getByText('Test Title')).toBeDefined();
    expect(screen.getByText('Author Name')).toBeDefined();
    expect(screen.getByText('#testcat')).toBeDefined();
    expect(screen.getByText('5 comments', { exact: false })).toBeDefined();
  });

  it('should call upVote handler when upvote button is clicked and not yet upvoted', async () => {
    // arrange
    const mockUpVote = vi.fn();
    const authUser = { id: 'user-2' };
    render(
      <MemoryRouter>
        <ThreadItem {...fakeThread} authUser={authUser} upVote={mockUpVote} />
      </MemoryRouter>
    );
    const upVoteButton = screen.getByText('▲ 0');

    // act
    await userEvent.click(upVoteButton);

    // assert
    expect(mockUpVote).toHaveBeenCalledWith(fakeThread.id);
  });

  it('should call neutralVote handler when upvote button is clicked and already upvoted', async () => {
    // arrange
    const mockNeutralVote = vi.fn();
    const authUser = { id: 'user-1' };
    const upVotedThread = { ...fakeThread, upVotesBy: ['user-1'] };
    render(
      <MemoryRouter>
        <ThreadItem {...upVotedThread} authUser={authUser} neutralVote={mockNeutralVote} />
      </MemoryRouter>
    );
    const upVoteButton = screen.getByText('▲ 1');

    // act
    await userEvent.click(upVoteButton);

    // assert
    expect(mockNeutralVote).toHaveBeenCalledWith(fakeThread.id);
  });
});
