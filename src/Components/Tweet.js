import React from "react";
import rushdie from "../img/rushdie.jpg";
import "../Stylesheets/normalize.scss";
import { ReactSVG } from "react-svg";
import { ReactComponent as CommentSVG } from "../icons/comment.svg";
import { ReactComponent as RetweetSVG } from "../icons/retweet.svg";
import { ReactComponent as HeartSVG } from "../icons/heart.svg";
import { ReactComponent as StatsSVG } from "../icons/stats.svg";

export default function Tweet() {
  return (
    <div>
      <div className="tweet">
        <img src={rushdie}></img>
        <div className="tweetAuthor">
          <p className="authorName">Author Name</p>
          <p className="authorUsername">@authorname</p>
          <p className="tweetTime">· 10h</p>
        </div>
        <div className="tweetContent">
          <p>
            This is his tweet that shouldn't be longer than 140 characters. It
            will say something that sounds clever.
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
    </div>
  );
}
