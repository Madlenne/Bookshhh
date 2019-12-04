import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen.jsx';
import LibraryScreen from './screens/LibraryScreen/LibraryScreen.jsx';
import WorkspacesListScreen from './screens/WorkspacesListScreen/WorkspacesListScreen.jsx';
import WorkspaceScreen from './screens/WorkspaceScreen/WorkspaceScreen.jsx';
import GenresListScreen from './screens/GenresListScreen/GenresListScreen.jsx';
import GenreScreen from './screens/GenreScreen/GenreScreen.jsx';
import Top10Screen from './screens/Top10Screen/Top10Screen.jsx';
import NewsScreen from './screens/NewsScreen/NewsScreen.jsx';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen.jsx';
import BookScreen from './screens/BookScreen/BookScreen.jsx';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={WelcomeScreen} />
        <Route exact path="/top" component={Top10Screen} />
        <Route exact path="/genres" component={GenresListScreen} />
        <Route exact path="/genres/:genre" component={GenreScreen} />
        <Route exact path="/workspaces" component={WorkspacesListScreen} />
        <Route path="/workspaces/:workspace" component={WorkspaceScreen} />
        <Route path="/book/:id" component={BookScreen} />
        <Route exact path="/news" component={NewsScreen} />
        <Route path="/library" component={LibraryScreen} />
        <Route path="/profile" component={ProfileScreen} />
      </Router>
    </div>
  );
}

export default App;
