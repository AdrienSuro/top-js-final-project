import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Tweet from "./Tweet";
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
    /////Commented out because too data consuming ////
    // const interval = setInterval(() => fetchOwnTweets(), 10000);
    // return () => clearInterval(interval);
  });

  return (
    <div>
      {userTweets.map((e) => (
        <Tweet
          key={e.id}
          userId={e.userId}
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
