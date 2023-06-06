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
import { doc, updateDoc, increment } from "firebase/firestore";
import { db, getUserDescription } from "./Firebase";
import { Link, BrowserRouter } from "react-router-dom";

function Tweet(props) {
  function getDate() {
    let currentDate = new Date().getTime();
    let tweetDate = props.timestamp.toDate().getTime();
    let diff = currentDate - tweetDate;
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

  function incrementLikes(docId) {
    const ref = doc(db, "tweets", docId);
    updateDoc(ref, {
      likes: increment(1),
    });
  }

  function incrementRetweets(docId) {
    const ref = doc(db, "tweets", docId);
    updateDoc(ref, {
      retweets: increment(1),
    });
  }

  return (
    <div>
      <div className="tweet">
        <img src={rushdie}></img>
        <div className="tweetAuthor">
          <p className="authorName">{props.name}</p>
          <Link to={`/${props.userName}`}>
            <p className="authorUsername">@{props.userName}</p>
          </Link>
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
            <RetweetSVG
              id="retweetSVG"
              onClick={() => incrementRetweets(props.docId)}
            />
          </div>
          <span id="retweetSpan">{props.retweets}</span>
          <div id="heartIcon">
            <HeartSVG
              id="heartSVG"
              onClick={() => incrementLikes(props.docId)}
            />
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
