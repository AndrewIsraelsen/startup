import React from 'react';
import ReactDOM from 'react-dom/client';
import './chat.css';
import { FullChat } from './chatComps';

export function Chat() {

  const userName = localStorage.getItem('userName');

  return (
        <FullChat userName={userName}/>
  );
}
