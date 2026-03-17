import React from 'react';
import PropTypes from 'prop-types';

function RegisterInput({ register }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onNameChange = (e) => setName(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form className="flex flex-col gap-4 mt-6" onSubmit={onSubmitHandler}>
      <input
        type="text"
        value={name}
        onChange={onNameChange}
        placeholder="Name"
        className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
        required
      />
      <input
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
        className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
        required
      />
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Password"
        className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
        required
      />
      <button
        type="submit"
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Register
      </button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
