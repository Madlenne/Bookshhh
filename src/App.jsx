import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen.jsx';
import LibraryScreen from './screens/LibraryScreen/LibraryScreen.jsx';
import WorkspaceScreen from './screens/WorkspaceScreen/WorkspaceScreen.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={WelcomeScreen} />
        <Route exact path="/top" component={WelcomeScreen} />
        <Route exact path="/genres" component={WelcomeScreen} />
        <Route exact path="/workspaces" component={WorkspaceScreen} />
        <Route exact path="/news" component={WelcomeScreen} />
        <Route path="/library" component={LibraryScreen} />
      </Router>
    </div>
  );
}

export default App;
