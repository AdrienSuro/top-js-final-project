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

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const allTweets = collection(db, "tweets");
      const q = query(allTweets, where("userName", "==", "adrien_surowiec"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
      });
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
          <Tweet />
          <Tweet />
        </div>
        <div className="rightColumn"></div>
      </body>
    </div>
  );
};

export default App;
