import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-8">
        <h2 className="text-3xl font-bold text-center text-white">Sign In</h2>
        <p className="text-gray-400 text-center mt-2">Welcome back to Dicoding Forum</p>

        <LoginInput login={onLogin} />

        <p className="mt-6 text-center text-gray-400">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
