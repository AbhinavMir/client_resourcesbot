import React from "react";
import firebase from ".././Firebase";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tweetsList: [] };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("tweetdata")
      .on("value", (snapshot) => {
        let tweetList = [];
        snapshot.forEach((snap) => {
          // snap.val() is the dictionary with all your keys/values from the 'tweetList' path
          tweetList.push(snap.val());
        });
        this.setState({ tweetsList: tweetList });
      });
  }

  render() {
    return (
      <div className="MainDiv">
        <div className="container">
          <input type="text"></input>
          <table id="example" className="display table">
            <thead className="thead-dark">
              <tr>
                <th>Facilities</th>
                <th>Location</th>
                <th>Time</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tweetsList.map((data) => {
                console.log(data);
                return (
                  <tr>
                    <td>{data.keywords}</td>
                    <td>{data.location}</td>
                    <td>{data.time}</td>
                    <td>
                      <a href={data.tweet_link}>Source</a>
                    </td>
                  </tr>
                );
              })}
              console.log(data.refer)
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default App;
