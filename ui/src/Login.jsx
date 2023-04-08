import { useState } from 'react';

export const Login = ({ handleAuthentication = () => {} }) => {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: '250px' }}>
        <h2>Login</h2>
        <input type="text" placeholder="user" onChange={(e) => setUser(e.target.value)} />
        <input type="password" placeholder="password" onChange={(e) => setPwd(e.target.value)} />
        <button
          type="submit"
          style={{ maxWidth: '100px' }}
          onClick={(e) => {
            e.preventDefault();
            handleAuthentication({ user, pwd });
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};
