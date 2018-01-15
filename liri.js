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
    if (!value) {
      console.log("------------------------------\nSong: The Sign \nArtist: Ace of Base \nAlbum: Greatest Hits \nPreview URL: https://p.scdn.co/mp3-preview/5ca0168d6b58e0f993b2b741af90ecc7c9b16893?cid=71c9a267d8e94da184aa5c4252d73429")
    } else {
      song();
    }
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
    spotifyy.search({ type: 'track', query: value || "The Sign Ace of Base", limit: 10 }, function(error, response) {
      if (error) {
        return console.log('Error occurred: ' + error);
      }
      for (var i = 0; i < response.tracks.items.length; i++) {
      console.log("--------------------" + "\n");
      console.log("Song: " + response.tracks.items[i].name);
      console.log("Artist: " + response.tracks.items[i].artists[0].name);
      console.log("Album: " + response.tracks.items[i].album.name);
      console.log("Preview URL: " + response.tracks.items[i].preview_url);
      }
    });
    
}