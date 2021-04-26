import React from "react";
import "./App.css";
//Calling Firebase config setting to call the data
import firebase from "./Firebase";
import ListDatabase from './components/ListDatabase.js'


function App() {
  return (
    <div className="App">
      <ListDatabase />
    </div>
  );
}

export default App;