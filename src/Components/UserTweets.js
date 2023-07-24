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

export default function UserTweets() {
  const [userTweets, setUserTweets] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const allTweets = collection(db, "tweets");
      const q = query(allTweets, where("userName", "==", username));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tweets = [];
        querySnapshot.forEach((doc) => {
          tweets.push(doc.data());
        });
        tweets.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
        setUserTweets(tweets);
      });
    };
    fetchData();

    const interval = setInterval(() => fetchData(), 10000);
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
