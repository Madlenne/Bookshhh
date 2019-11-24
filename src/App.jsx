import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen.jsx';
import LibraryScreen from './screens/LibraryScreen/LibraryScreen.jsx';
import WorkspaceScreen from './screens/WorkspaceScreen/WorkspaceScreen.jsx';
import GenreScreen from './screens/GenreScreen/GenreScreen.jsx';
import Top10Screen from './screens/Top10Screen/Top10Screen.jsx';
import NewsScreen from './screens/NewsScreen/NewsScreen.jsx';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={WelcomeScreen} />
        <Route exact path="/top" component={Top10Screen} />
        <Route exact path="/genres" component={GenreScreen} />
        <Route exact path="/workspaces" component={WorkspaceScreen} />
        <Route exact path="/news" component={NewsScreen} />
        <Route path="/library" component={LibraryScreen} />
      </Router>
    </div>
  );
}

export default App;
