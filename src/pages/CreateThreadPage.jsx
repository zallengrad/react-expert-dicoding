import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 md:p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-2">Create New Thread</h1>
        <p className="text-gray-400 mb-6">Share your ideas, ask questions, or start a discussion.</p>

        <ThreadInput addThread={onAddThread} />
      </div>
    </div>
  );
}

export default CreateThreadPage;
