require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require('request');
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
    if (!value){
      console.log("********************************" + "\n");
      console.log("Title of the movie: Mr. Nobody");
      console.log("Year the movie was released: 26 Sep 2013");
      console.log("Rotten Tomatoes Rating: 66%");
      console.log("Country where produced: Belgium, Germany, Canada, France, USA, UK");
      console.log("Language of the movie: English, Mohawk");
      console.log("Plot of the movie: \n" + "A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.");
      console.log("Actors in the movie: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham" + "\n");
      console.log("********************************");
    } else{
      movie();	
    } 
      break;
  
    case "do-what-it-says":
      dothis();
      break;
  }

  function tweets() {

      fs.appendFile("log.txt", "tweet: " + value, function(err) {
          if (err) {
              return console.log(err);
          }
      });

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

    fs.appendFile("log.txt", "song: " + value, function(err) {
      if (err) {
        return console.log(err);
      }
    });

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
    

    function movie(){

        fs.appendFile("log.txt", "movie: " + value, function(err) {
            if (err) {
                return console.log(err);
            }
        });

      request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy", function(error, response, body){
        //request successful with status 200
        if(!error && response.statusCode === 200){
          //parse body and grab imdbRating 
          console.log("********************************" + "\n");
          console.log("Title of the movie: " + JSON.parse(body).Title);
          console.log("Year the movie was released: " + JSON.parse(body).Released);
    
          if(JSON.parse(body).Ratings[1]){
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
          } else {
            console.log("Rating: " + JSON.parse(body).Ratings[0].Value);
          };
    
          // console.log(JSON.parse(body));
          console.log("Country where produced: " + JSON.parse(body).Country);
          console.log("Language of the movie: " + JSON.parse(body).Language);
          console.log("Plot of the movie: \n" + JSON.parse(body).Plot);
          console.log("Actors in the movie: " + JSON.parse(body).Actors + "\n");
          console.log("********************************");
        }
      });
    }
     
      function dothis(){

          fs.appendFile("log.txt", "whatever: " + value, function(err) {
              if (err) {
                  return console.log(err);
              }
          });

        fs.readFile("random.txt", "utf8", function(error, data){
          //log error to console
          if (error){
            return console.log(error);
          }
          //print contents of random.txt
          console.log(data + "\n" + " Loading...");
          //split by commas for readability
          var dataArr = data.split(",");
          //re-display contents as array for later
          value = dataArr[1];
          song()
        });
      }
    
