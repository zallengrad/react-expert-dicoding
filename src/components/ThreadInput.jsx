import React from 'react';
import PropTypes from 'prop-types';

function ThreadInput({ addThread }) {
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [body, setBody] = React.useState('');

  const onTitleChange = (e) => setTitle(e.target.value);
  const onCategoryChange = (e) => setCategory(e.target.value);

  // For rich text, simple hack with content editable div
  const onBodyChange = (e) => setBody(e.target.innerHTML);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      addThread({ title, body, category });
    }
  };

  return (
    <form className="flex flex-col gap-5 mt-6" onSubmit={onSubmitHandler}>
      <div>
        <label htmlFor="title" className="block text-gray-400 text-sm mb-2">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={onTitleChange}
          placeholder="What's on your mind?"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-gray-400 text-sm mb-2">Category (Optional)</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={onCategoryChange}
          placeholder="e.g. react, general, discussion"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white font-mono text-sm"
        />
      </div>

      <div>
        <label htmlFor="body" className="block text-gray-400 text-sm mb-2">Body</label>
        <div
          id="body"
          contentEditable
          onInput={onBodyChange}
          className="w-full px-4 py-3 min-h-[150px] rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white whitespace-pre-wrap"
          data-placeholder="Start typing..."
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
      >
        <span>Post Thread</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
