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
import { tweetsCollection, db } from "./Firebase";

export default function TweetList(user) {
  const [allTweets, setAllTweets] = useState([]);
  // Update this in order to get tweets from all the users that the active user follows
  useEffect(() => {
    const fetchData = async () => {
      const allTweets = collection(db, "tweets");
      const q = query(allTweets);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const tweets = [];
        querySnapshot.forEach((doc) => {
          tweets.push(doc.data());
        });
        tweets.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
        setAllTweets(tweets);
      });
    };
    fetchData();

    const interval = setInterval(() => fetchData(), 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {allTweets.map((e) => (
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
