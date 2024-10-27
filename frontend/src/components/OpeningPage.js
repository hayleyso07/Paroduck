import React from 'react';
import logo from '../assets/logo.png';
import '../styles/OpeningPage.css';

const OpeningPage = ({ onStartPress }) => {
  return (
    <div className="opening-page">
      <img src={logo} alt="Paroduck Logo" className="logo" />
      <h1 className="title">Paroduck</h1>
      <button onClick={onStartPress} className="start-button">
        Study better through music
      </button>
    </div>
  );
};

export default OpeningPage;