import React, {useState, useEffect} from "react";
import {FormControl, FormGroup, FormControlLabel, Checkbox, Typography} from '@material-ui/core';
import * as Realm from 'realm-web';

import "./App.css";

// Calling Firebase config setting to call the data
import firebase from "./Firebase";
// importing mongodb
import mongo from "./MongoRealm";

// importing components
import ListDatabase from './components/ListDatabase.js'
import SearchPage from './components/SearchPage.js'
import ListPicker from './components/ListPicker/ListPicker.js';

// import res
import resources from './raw/resources.js';
const initRes = {};
resources.forEach((d) => initRes[d] = false);

const App = () => {
  const [city, setCity] = useState('');
  const [res, setRes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    mongo.logIn(Realm.Credentials.anonymous())
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log('MONGO A-USER ERROR:', err.message);
      })
  }, [])

  useEffect(() => {
    // initialize firebase analytics
    const analytics = firebase.analytics();

    /*
      Though the analytics module would have default 
      events, but to be more clear and to make sure 
      we are defining the following event
    */
    analytics.logEvent('website_opened');

    // url based results
    const ref = window.location.href.split("?")[1];
    if (ref === undefined) {
      return;
    }
    const params = ref.split('&');

    let city = '';
    let reses = [];
    params.forEach((s) => {
      const [key, value] = s.split('=');
      if (key.toLowerCase() === 'city') {
        city = key;
      } else if (value === '1' && resources.includes(key.toLowerCase())) {
        reses.push(key.toLowerCase());
      }
    })
    setCity(city);
    setRes(reses);
  }, []);

  const checkerHandlePress = (event) => {
      if (event.target.checked) {
        const n = [...res ,event.target.name];
        setRes(n);
      } else {
        const n = res.filter((r) => r !== event.target.name);
        setRes(n);
      }
  };

  console.log(user);

  return (
    <div className="App">
      <br />
      <ListPicker
        title="Select your City below"
        onPress={(c) => setCity(c)}
      />
      <br />
      <FormControl style={{margin: 20}} component="fieldset">
          <Typography variant="h6">Select Resources to Display</Typography>
          <FormGroup>
              {
                  resources.map((key) => {
                      return (
                          <FormControlLabel
                              control={
                                <Checkbox checked={res.includes(key)} onChange={checkerHandlePress} name={key} />
                              }
                              label={key}
                          />
                      );
                  })
              }
          </FormGroup>
      </FormControl>
      <br />
      {/* <SearchPage /> */}
      <ListDatabase city={city} reses={res} />
    </div>
  );
}

export default App;