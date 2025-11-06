import React from 'react';
import './calendar.css';
import { Cal } from './cal';


export function Calendar({ userName }) {
  return (
    
        <Cal userName={userName} />

  );
}