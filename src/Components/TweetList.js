import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
import Tweet from "./Tweet";
import {
  returnForYouTweets,
  tweetsCollection,
  returnFollowingTweets,
  usersCollection,
} from "../api/Data";

export default function TweetList(props) {
  const [allTweets, setAllTweets] = useState([]);
  const [forYouTweets, setForYouTweets] = useState([]);
  const [followingTweets, setFollowingTweets] = useState([]);

  let following = props.following;

  useEffect(() => {
    async function getForYouTweets() {
      let tweets = await returnForYouTweets();
      setForYouTweets(tweets);
    }
    async function getFollowingTweets() {
      setFollowingTweets(await returnFollowingTweets());
    }

    getForYouTweets();
    getFollowingTweets();
  }, []);

  if (following === false) {
    console.log(forYouTweets);
    return (
      <div>
        <h1
          onClick={() => {
            console.log(forYouTweets);
          }}
        >
          Test me
        </h1>
        {forYouTweets.map((e, index) => (
          <Tweet
            key={index}
            userId={e.userId}
            content={e.content}
            likes={e.likes}
            retweets={e.retweets}
            comments={e.comments}
            stats={e.stats}
            timestamp={e.timestamp}
            docId={e.docId}
          />
        ))}
      </div>
    );
  } else {
    console.log("Trying to show following tweets");
  }
}
