var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'MSPlgmdSfMp74OFRW1xlfBYYh',
  consumer_secret: '9Hv2b59bm7RHmUqYf9DzN7cxctOSbBkSduGHGFH4JgzyC2vmVC',
  access_token_key: '3248180491-VqOfZVImZZTuc56Jh8CTB9G3SMHdgO9VlrRdif5',
  access_token_secret: 'w7UgWEabp0TE5x75AYhVbFF6oQyaXrQTcaIn00QtkIlUb'
});
 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/tweet', function(req, res, nest) {
  client.post('statuses/update', {status: req.body.tweet }, function(err, tweets, respons) {
    if (!err) {
      res.json(tweets);
    }
  })
});



router.post('/search', function(req, res, next) {
  var words = req.body.words.split(' ');

  client.get('search/tweets', {q: words.join(' OR '), count: 100}, function(error, tweets, response){
    if (!error) {
      var stats = {}, tweetTxt;
      tweets.statuses.forEach(function(tweet) {
        tweetTxt = tweet.text.toLowerCase();
        words.forEach(function(word) {
          stats[word] = stats[word] || 0;
          if (tweetTxt.match(word.toLowerCase())) {
            stats[word]++;
          }
        });
      });
      console.log(stats);
      res.json(stats);
    }
  });
});

module.exports = router;