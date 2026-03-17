/**
 * skenario pengujian LoginInput:
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

describe('LoginInput component', () => {
  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Email');

    // act
    await userEvent.type(emailInput, 'test@example.com');

    // assert
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Password');

    // act
    await userEvent.type(passwordInput, 'password123');

    // assert
    expect(passwordInput.value).toBe('password123');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    // act
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
