import React from "react";
import { useState } from "react";
import rushdie from "../img/rushdie.jpg";
import "../Stylesheets/normalize.scss";
import { ReactSVG } from "react-svg";
import { ReactComponent as CommentSVG } from "../icons/comment.svg";
import { ReactComponent as RetweetSVG } from "../icons/retweet.svg";
import { ReactComponent as HeartSVG } from "../icons/heart.svg";
import { ReactComponent as StatsSVG } from "../icons/stats.svg";
import { v4 as uuidv4 } from "uuid";
import { toDate } from "firebase/firestore";

function Tweet(props) {
  function getDate() {
    let currentDate = new Date().getTime();
    let tweetDate = props.timestamp.toDate().getTime();
    let diff = currentDate - tweetDate;
    console.log(
      "diff is " +
        diff +
        " ; currentDate is " +
        currentDate +
        " tweetDate is " +
        currentDate
    );
    if (diff < 1000) {
      return "0s";
    } else if (diff < 60000) {
      return parseInt(diff / 1000) + "s";
    } else if (diff < 3600000) {
      return parseInt(diff / 60000) + "m";
    } else if (diff < 86400000) {
      return parseInt(diff / 3600000) + "h";
    } else {
      return props.timestamp.toDate().toLocaleString();
    }
  }

  function getRandomNum() {
    return Math.floor(Math.random() * 999);
  }

  return (
    <div>
      <div className="tweet">
        <img src={rushdie}></img>
        <div className="tweetAuthor">
          <p className="authorName">{props.name}</p>
          <p className="authorUsername">{props.userName}</p>
          <p className="tweetTime">· {getDate()}</p>
        </div>
        <div className="tweetContent">
          <p>{props.content}</p>
        </div>
        <div className="tweetDetails">
          <div id="commentIcon">
            <CommentSVG id="commentSVG" />
          </div>
          <span id="commentSpan">{props.comments}</span>
          <div id="retweetIcon">
            <RetweetSVG id="retweetSVG" />
          </div>
          <span id="retweetSpan">{props.retweets}</span>
          <div id="heartIcon">
            <HeartSVG id="heartSVG" />
          </div>
          <span id="heartSpan">{props.likes}</span>
          <div id="statsIcon">
            <StatsSVG id="statsSVG" />
          </div>
          <span id="statsSpan">{props.stats}</span>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
