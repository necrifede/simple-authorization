import { useEffect, useState } from 'react';
import { Route, Redirect, Link } from 'wouter';
import { host } from '../config';
import { Login } from './Login';
import { Message } from './Message';
import { Stats } from './Stats';

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

function App() {
  const [token, setToken] = useState(undefined);
  const isAuthenticated = !!token || token === '';

  const handleAuthentication = ({ user, pwd }) => {
    const encodedCredentials = window.btoa(`${user}:${pwd}`);
    fetch(`${host}/api/login`, {
      method: 'GET',
      headers: { Authorization: `Basic ${encodedCredentials}` },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => setToken(res?.token ?? undefined))
      .catch((err) => {
        console.error(err?.message);
      });
  };

  const handleMessages = ({ from, to, message }) => {
    fetch(`${host}/api/message`, {
      method: 'POST',
      body: JSON.stringify({ from, to, message }),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.succeed) {
          alert(res.message);
        } else {
          throw Error(res.message);
        }
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setToken(undefined);
  };

  const username = isAuthenticated ? parseJwt(token)?.sub ?? '.' : undefined;

  return (
    <div className="App">
      {isAuthenticated && (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <span>{username}</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {username === 'admin' && <Link href={'/stats'}>Stats</Link>}
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
      <Route path="/">
        <Redirect to="/messages" />
      </Route>
      <Route path="/messages">
        {isAuthenticated ? <Message handleMessages={handleMessages} /> : <Redirect to="/login" />}
      </Route>
      <Route path="/stats">
        {isAuthenticated ? (
          username === 'admin' ? (
            <Stats token={token} />
          ) : (
            <div>Forbidden</div>
          )
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/login">
        {isAuthenticated ? <Redirect to="/messages" /> : <Login handleAuthentication={handleAuthentication} />}
      </Route>
    </div>
  );
}

export default App;
