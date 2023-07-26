import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  collection,
  onSnapshot,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
import Tweet from "./Tweet";
import { tweetsCollection, db } from "../api/Firebase";
import { getOwnTweets } from "../api/Data";

export default function UserTweets(props) {
  const [userTweets, setUserTweets] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const fetchOwnTweets = async () => {
      try {
        const tweets = await getOwnTweets(username);
        setUserTweets(tweets);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchOwnTweets();
    const interval = setInterval(() => fetchOwnTweets(), 10000);
    return () => clearInterval(interval);
  });

  return (
    <div>
      {userTweets.map((e) => (
        <Tweet
          key={e.id}
          userName={e.userName}
          name={e.name}
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
}
