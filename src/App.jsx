import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={WelcomeScreen} />
        <Route exact path="/top" component={WelcomeScreen} />
        <Route exact path="/genres" component={WelcomeScreen} />
        <Route exact path="/workspaces" component={WelcomeScreen} />
        <Route exact path="/news" component={WelcomeScreen} />
      </Router>
    </div>
  );
}

export default App;
