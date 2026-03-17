import React from 'react';
import PropTypes from 'prop-types';

function CommentInput({ addComment }) {
  const [content, setContent] = React.useState('');

  const submitComment = (e) => {
    e.preventDefault();
    if (content.trim()) {
      addComment(content);
      setContent('');
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <form className="mt-8 mb-6" onSubmit={submitComment}>
      <p className="text-white font-bold mb-3">Leave a Comment</p>
      <textarea
        value={content}
        onChange={handleContentChange}
        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-4 min-h-[100px] focus:outline-none focus:border-blue-500 mb-3"
        placeholder="What are your thoughts?"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
      >
        Send
      </button>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
