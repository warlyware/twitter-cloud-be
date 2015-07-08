var express = require('express');
var router = express.Router();
var Twitter = require('twitter');

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'process.env.CONSUMER_KEY',
  consumer_secret: 'process.env.CONSUMER_SECRET',
  access_token_key: 'process.enc.ACCESS_KEY',
  access_token_secret: 'process.env.ACCESS_SECRET'
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