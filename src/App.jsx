import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen.jsx';
import LibraryScreen from './screens/LibraryScreen/LibraryScreen.jsx';
import GenresListScreen from './screens/GenresListScreen/GenresListScreen.jsx';
import GenreScreen from './screens/GenreScreen/GenreScreen.jsx';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen.jsx';
import BookScreen from './screens/BookScreen/BookScreen.jsx';
import { firebaseConfig } from './firebaseConfig.js';
import './App.css';

import * as firebase from 'firebase';
  
  function App() {
    firebase.initializeApp(firebaseConfig);
    
  
return (
    <div className="App">
      <Router>
        <Route exact path="/" component={WelcomeScreen} />
        <Route exact path="/genres" component={GenresListScreen} />
        <Route exact path="/genres/:genre" component={GenreScreen} />
        <Route path="/book/:id" component={BookScreen} />
        <Route path="/library/:filter?" component={LibraryScreen} />
        <Route path="/profile" component={ProfileScreen} />
      </Router>
    </div>
  );
}

export default App;
