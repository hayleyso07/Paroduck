import React, { useState } from 'react';
import OpeningPage from './components/OpeningPage';
import logo from './assets/logo.png';
import './styles/App.css';

function App() {
  const [showOpeningPage, setShowOpeningPage] = useState(true);
  const [studyNotes, setStudyNotes] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [isGenerating, setIsGenerating] = useState(false); // New state variable

  const handleStartPress = () => {
    setShowOpeningPage(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true); // Lock the input field
    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ study_notes: studyNotes }),
      });

      const data = await response.json();
      setLyrics(data.lyrics || data.error); // Handle error if present
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsGenerating(false); // Unlock input after generating
    }
  };

  const handleGoHome = () => {
    setShowOpeningPage(true);
    setStudyNotes('');
    setLyrics('');
    setIsGenerating(false); // Reset state when going home
  };

  if (showOpeningPage) {
    return <OpeningPage onStartPress={handleStartPress} />;
  }

  return (
    <div className="App">
      <div className="app-header">
        <img src={logo} alt="Paroduck Logo" className="app-logo" onClick={handleGoHome} style={{ cursor: 'pointer' }} />
      </div>
      <form onSubmit={handleSubmit} className="study-form">
        <textarea
          value={studyNotes}
          onChange={(e) => setStudyNotes(e.target.value)}
          placeholder="Enter your study notes here"
          className="study-notes"
          readOnly={isGenerating} // Make text area read-only while generating
        />
        <button type="submit" className="generate-button" disabled={isGenerating}>Generate Lyrics</button>
      </form>
      {lyrics && (
        <div className="lyrics-container">
          <h2>Generated Lyrics:</h2>
          <pre className="lyrics">{lyrics}</pre>
          <p>
            Go back to <span className="go-home-link" onClick={handleGoHome}>Paroduck</span>.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;