/*

  SERVER.JS
  Code to use the Twitter API on the web.

*/


// import express library
let express = require('express');
let app = express();
let server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  console.log('Starting app! Listening at http://localhost:3000');
}
app.use(express.static('public'));

// import twit package
let Twit = require('twit');
let config = require('./config');
let T = new Twit(config);

/*
  Twitter API
  get() method --> search by hashtag, user, location, etc
  search for all tweets containing a specific word since certain date
  count: how many tweets (max is 100)
*/

app.get('/tweets/:query', getTweets);

function getTweets(req, res) {
  let query = req.params.query;
  // search for 100 tweets (max is 100)
  T.get('search/tweets', { q: query, count: 100 }, gotData);

  function gotData(err, data) {
    // get only the tweet text
    let tweets = data.statuses;
    // send tweets to p5.js load it
    res.send(tweets);
  }
}