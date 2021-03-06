import React from "react";
import {formatDistance} from 'date-fns';
import firebase from "../Firebase";
import mongo from '../MongoRealm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetsList: [],
    };
  }

  componentDidMount() {
    const mongodb = mongo.currentUser.mongoClient("mongodb-atlas");
    const tweetData = mongodb.db("tweet").collection("data");
    tweetData
      .find({}, {sort: {time: 1}})
      .then((tweetList) => {
        this.setState({ tweetsList: tweetList.reverse() });
      })
      .catch((err) => {
        console.log('MONGO DATABASE FETCH ERROR:', err.message);
      })
    // firebase
    //   .database()
    //   .ref("tweetdata")
    //   .orderByChild('time') // not working because time format is not number but string
    //   .on("value", (snapshot) => {
    //     let tweetList = [];
    //     snapshot.forEach((snap) => {
    //       // snap.val() is the dictionary with all your keys/values from the 'tweetList' path
    //       tweetList.push(snap.val());
    //     });
    //     this.setState({ tweetsList: tweetList.reverse() });
    //   });
  }

  listFilter () {
    const {tweetsList} = this.state;
    const {city, reses} = this.props;
    const n = tweetsList.filter((t) => {
      let shouldIncludeCity = false;
      if (city !== '') {
        if (t.location.toLowerCase() === city.toLowerCase()) {
          shouldIncludeCity = true;
        }
      } else {
        shouldIncludeCity = true;
      }

      let shouldIncludeRes = false;
      if (reses.length !== 0) {
        if (reses.includes(t.keywords.toLowerCase())) {
          shouldIncludeRes = true;
        }
      } else {
        shouldIncludeRes = true;
      }

      return shouldIncludeRes && shouldIncludeCity;
    });
    return n;
  }

  render() {
    return (
      <div className="MainDiv">
        <div className="container">
          <table id="example" className="display table">
            <thead className="thead-dark">
              <tr>
                <th>Facilities</th>
                <th>Location</th>
                <th>Time</th>
                <th>Tweet</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {this.listFilter().map((data) => {
                return (
                  <tr>
                    <td>{data.keywords}</td>
                    <td>{data.location}</td>
                    <td>{formatDistance(new Date(data.time), Date.now(), { addSuffix: true })}</td>
                    <td>{data.tweet_text ? data.tweet_text : 'Please click the source to read this tweet'}</td>
                    <td>
                      <a href={data.tweet_link} target="_blank">Source</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default App;
