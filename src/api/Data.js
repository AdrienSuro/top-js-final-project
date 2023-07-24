// ******* READ ******* //

export function getOwnTweets(userName) {
  //will get user Tweets
}

export function getRetweets(userName) {
  //will get user Tweets
}

export function getOwnTweetsAndRetweets(userName) {
  // will get both Tweets and Retweets
}

export function getProfileData(userName) {
  // will get user Info as an object
}

export function getTimeline(userName) {
  return;
}

// ******* WRITE ******* //

export function createNewUser(userObject) {
  // will create a New User
}

export function changeUserDescription(userName, newDescription) {
  return;
}

export function changeUserLocation(userName, newLocation) {
  return;
}

export function changeUserDisplayName(userName, newDisplayName) {
  return;
}

export function addTweet(userName, content) {
  return;
}

export function retweet(userName, reference) {
  //userName will be taken locally, from the userSlice
  //reference will be taken from the actual tweet
  return;
}
