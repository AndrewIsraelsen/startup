import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }


  return (
        <main className="login-main">
            <h2 className="fw-bold">Login</h2>
            <div>
            <span>Username</span>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="johnsmith@email.com" />
            </div>
            <div>
            <span>Password</span>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            </div>
            <div id="button">
                <Button onClick={() => loginUser()} className="btn btn-primary">Login</Button>
                <Button onClick={() => createUser()} className="btn btn-secondary">Create</Button>
            </div>

            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
              
        </main>
  );
}
