import "../Stylesheets/App.scss";
import rushdie from "../img/rushdie.jpg";
import myProfilePicture from "../img/me.png";
import imageIcon from "../icons/image-icon.png";
import comment from "../icons/comment.png";
import retweet from "../icons/retweet.png";
import stats from "../icons/stats.png";
import heart from "../icons/heart.png";
import "../Stylesheets/normalize.scss";
import { ReactSVG } from "react-svg";
import { ReactComponent as CommentSVG } from "../icons/comment.svg";
import { ReactComponent as RetweetSVG } from "../icons/retweet.svg";
import { ReactComponent as HeartSVG } from "../icons/heart.svg";
import { ReactComponent as StatsSVG } from "../icons/stats.svg";

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
              <p className="authorName">Author Name</p>
              <p className="authorUsername">@authorname</p>
              <p className="tweetTime">· 10h</p>
            </div>
            <div className="tweetContent">
              <p>
                This is his tweet that shouldn't be longer than 140 characters.
                It will say something that sounds clever.
              </p>
            </div>
            <div className="tweetDetails">
              <div id="commentIcon">
                <CommentSVG id="commentSVG" />
              </div>
              <span id="commentSpan">23</span>
              <div id="retweetIcon">
                <RetweetSVG id="retweetSVG" />
              </div>
              <span id="retweetSpan">55</span>
              <div id="heartIcon">
                <HeartSVG id="heartSVG" />
              </div>
              <span id="heartSpan">229</span>
              <div id="statsIcon">
                <StatsSVG id="statsSVG" />
              </div>
              <span id="statsSpan">1.3K</span>
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
      <ReactSVG src="../icons/comment.svg" />
    </div>
  );
}

export default App;
