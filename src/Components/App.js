import "../Stylesheets/App.scss";
import "../Stylesheets/normalize.scss";
import Tweet from "./Tweet";
import WriteTweet from "./WriteTweet";
import tweetsCollection from "./Firebase";

function App() {
  return (
    <div className="App">
      <body>
        <div className="leftColumn"></div>
        <div className="mainColumn">
          <h1>Home</h1>
          <div className="chooseTimeline">
            <h3>For you</h3>
            <h3>Following</h3>
          </div>
          <WriteTweet />
          <Tweet />
          <Tweet />
        </div>
        <div className="rightColumn"></div>
      </body>
    </div>
  );
}

export default App;
