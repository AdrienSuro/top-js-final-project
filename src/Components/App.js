import React from "react";
import { useEffect, useState } from "react";
import "../Stylesheets/App.scss";
import "../Stylesheets/normalize.scss";
import Tweet from "./Tweet";
import WriteTweet from "./WriteTweet";
import { tweetsCollection, db } from "./Firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [allTweets, setAllTweets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allTweets = collection(db, "tweets");
      const q = query(allTweets, where("userName", "==", "adrien_surowiec"));
      const querySnapshot = await getDocs(q);
      const tweets = [];
      querySnapshot.forEach((doc) => {
        tweets.push(doc.data());
      });
      setAllTweets(tweets);
    };
    fetchData();
  }, []);

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
          <WriteTweet />
          {allTweets.map((e) => (
            <Tweet
              key={e.id}
              userName={e.userName}
              name={e.name}
              content={e.content}
              hearts={e.hearts}
              retweets={e.retweets}
              comments={e.comments}
              stats={e.stats}
              timestamp={e.timestamp}
            />
          ))}
        </div>
        <div className="rightColumn"></div>
      </body>
    </div>
  );
};

export default App;
