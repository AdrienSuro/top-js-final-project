import React from "react";
import rushdie from "../img/rushdie.jpg";
import "../Stylesheets/normalize.scss";
import { ReactSVG } from "react-svg";
import { ReactComponent as CommentSVG } from "../icons/comment.svg";
import { ReactComponent as RetweetSVG } from "../icons/retweet.svg";
import { ReactComponent as HeartSVG } from "../icons/heart.svg";
import { ReactComponent as StatsSVG } from "../icons/stats.svg";
import { v4 as uuidv4 } from "uuid";

export default function Tweet(props) {
  // function getTweetDate(date) {
  //   const currentDate = new Date().getTime();

  //   if ((date.toDate().getDate() - currentDate))
  // }

  return (
    <div>
      {console.log(props.timestamp.toDate().getDate())}
      {console.log(new Date())}
      {console.log(props.timestamp.toDate().getDate() - new Date())}
      <div className="tweet">
        <img src={rushdie}></img>
        <div className="tweetAuthor">
          <p className="authorName">{props.name}</p>
          <p className="authorUsername">{props.userName}</p>
          <p className="tweetTime">· {props.timestamp.toDate().getDate()}</p>
        </div>
        <div className="tweetContent">
          <p>{props.content}</p>
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
    </div>
  );
}
