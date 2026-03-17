import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = async ({ name, email, password }) => {
    try {
      await dispatch(asyncRegisterUser({ name, email, password }));
      alert('Registration Success!');
      navigate('/');
    } catch {
      // Error is handled in the thunk via alert, but we catch here to stop navigation
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl border border-gray-800 p-8">
        <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>
        <p className="text-gray-400 text-center mt-2">Join Dicoding Forum Today</p>

        <RegisterInput register={onRegister} />

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
