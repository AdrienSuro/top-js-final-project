import "../Stylesheets/App.scss";
import rushdie from "../img/rushdie.jpg";
import myProfilePicture from "../img/me.png";
import imageIcon from "../icons/image-icon.png";
import comment from "../icons/comment.png";
import retweet from "../icons/retweet.png";
import stats from "../icons/stats.png";
import heart from "../icons/heart.png";
import "../Stylesheets/normalize.scss";

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
          <div className="writeTweetBox">
            <img src={myProfilePicture} alt="userProfilePicture"></img>
            <textarea placeholder="What is happening?!"></textarea>
            <div className="tweetOptions">
              <div className="tweetOptionsIcon">
                <img src={imageIcon}></img>
              </div>
              <button className="tweetBtn">Tweet</button>
            </div>
          </div>
          <div className="tweet">
            <img src={rushdie}></img>
            <div className="tweetAuthor">
              <h3>Author Name</h3>
              <p>@authorname</p>
            </div>
            <div className="tweetContent">
              <p>
                This is his tweet that shouldn't be longer than 140 characters.
                It will say something that sounds clever.
              </p>
            </div>
            <div className="tweetDetails">
              <img src={comment}></img>
              <span>23</span>
              <img src={retweet}></img>
              <span>55</span>
              <img src={heart}></img>
              <span>229</span>
              <img src={stats}></img>
              <span>1.3K</span>
            </div>
          </div>
          <div className="tweet">
            <img src={rushdie}></img>
            <h3>Salman Rushdie</h3>
            <p>
              Roald Dahl was no angel but this is absurd censorship. Puffin
              Books and the Dahl estate should be ashamed.
            </p>
          </div>
          <div className="tweet">
            <h3>Alessandro Salazar</h3>
            <p>
              History is my passion. I could spend hours debatting with other
              users about the origins of 17th century wars.
            </p>
          </div>
        </div>
        <div className="rightColumn"></div>
      </body>
    </div>
  );
}

export default App;
