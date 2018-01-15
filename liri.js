require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var spotifyy = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var action = process.argv;
var value = "";

for (var i = 3; i < action.length; i++) {

  value = value + " " + action[i];

}

switch (command) {
    case "my-tweets":
      tweets();
      break;
  
    case "spotify-this-song":
      song();
      break;
  
    case "movie-this":
      movie();
      break;
  
    case "do-what-it-says":
      dothis();
      break;
  }

  function tweets() {
    client.get('statuses/user_timeline', { count: '20'}, function(error, tweets, response) {
        if(error) throw error;
        console.log("Here are your most recent Tweets:" + "\n")
        for (var i = 0; i < tweets.length; i++) {             
            console.log(JSON.stringify(tweets[i].text));
            console.log(tweets[i].created_at);
            console.log("--------------------" + "\n");    
        }
   });
      
  }

  function song() {
    spotifyy.search({ type: 'track', query: value }, function(error, response) {
      if(error) throw error;
      for (var i = 0; i < response.tracks.items.length; i++) {
      console.log("--------------------" + "\n");
      console.log("Song: " + response.tracks.items[i].name);
      console.log("Artist: " + response.tracks.items[i].artists[0].name);
      console.log("Album: " + response.tracks.items[i].album.name);
      console.log("Preview URL: " + response.tracks.items[i].preview_url);
      }
    });
    
}