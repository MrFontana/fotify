// REQUIRE DEPENDENCIES
// ============================================================
var express = require('express');
var session = require('express-session')
var bodyParser = require('body-parser');
var massive = require('massive');
var passportSpotify = require('passport-spotify').Strategy;
var passport = require('passport');
var cors = require('cors');
var config = require('./.config');
var util = require('util');
var axios = require('axios');

fotifyDb = massive.connectSync({
    connectionString: config.myConnectionString
});
// INITILIZE APP
// ============================================================
var app = module.exports = express();


// INITILIZE DEPENDENCIES
// ============================================================

// DATABASE
app.set('db', fotifyDb);
var db = app.get('db');

var dbCtrl = require('./dbCtrl/dbCtrl');

var corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(session({
    secret: config.mySecret,
    resave: 'false',
    saveUninitialized: 'true'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

// AUTH ENDPOINTS

app.get('/auth/spotify', passport.authenticate('spotify'));

app.get('/auth/spotify/callback',
    passport.authenticate('spotify', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        // Successful authentication, redirect home.

        res.redirect('/#/search');
    });

// SPOTIFY ENDPOINTS
// app.get()

app.get('/me', function(req, res, next) {
    console.log('/me Getting user: ', req.user);
    res.send(req.user);
});

// TODO
//Make endpoint at /api/artist
  //node has built in http
  //axios


//SEARCH FOR ARTIST BY NAME

app.get('/api/artist/:name', function(req, res) {
  // req.params.name

  console.log("Reached /search for artist endpoint.");

  // axios.defaults.headers.common['Authorization'] = req.user.accessToken;

  axios.get('https://api.spotify.com/v1/search?q=' + req.params.name + '&type=artist')
    .then(function(response) {
      console.log("SPOTIFY SEARCHING FOR ARTIST " + req.params.name + "...", response);
      res.send(response.data);
    });

});

//SEARCH FOR TOP TRACKS BY ARTIST

app.get('/api/tracks/:id', function(req, res) {
  // req.params.name

  console.log("Reached /search for tracks endpoint.");

  // axios.defaults.headers.common['Authorization'] = req.user.accessToken;

  axios.get('https://api.spotify.com/v1/artists/' + req.params.id + '/top-tracks?country=US')
    .then(function(response) {
      console.log("SPOTIFY SEARCHING FOR TRACKS BY ID " + req.params.id + "...", response);
      res.send(response.data);
    });

});

// GET ALBUMS OF SEARCHED ARTIST

app.get('/api/albums/:artistId', function(req, res) {

  // axios.defaults.headers.common['Authorization'] = req.user.accessToken;

  axios.get('https://api.spotify.com/v1/artists/' + req.params.artistId + '/albums')
    .then(function(response) {
      console.log("SPOTIFY GETTING ARTIST ALBUMS " + req.params.artistId + "...", response);
      res.send(response.data);
    });

});

// GET PLAYLISTS CONTAINING SEARCHED ARTISTS NAME

app.get('/api/playlist/:name', function(req, res) {
  // req.params.name

  console.log("Reached /search for playlist endpoint.");

  // axios.defaults.headers.common['Authorization'] = req.user.accessToken;

  axios.get('https://api.spotify.com/v1/search?q=' + req.params.name + '&type=playlist')
    .then(function(response) {
      console.log("SPOTIFY SEARCHING FOR PLAYLIST " + req.params.name + "...", response);
      res.send(response.data);
    });

});

//USER PLAYLIST BY PLAYLIST ID
app.get('/api/playlist/:user_id/:id', function(req, res) {
  // req.params.name

  console.log("Reached /search for playlist by id endpoint.");
  if (req.user.accessToken) axios.defaults.headers.common['Authorization'] = 'Bearer ' + req.user.accessToken;


  axios.get('https://api.spotify.com/v1/users/' + req.params.user_id + '/playlists/' + req.params.id + '?offset=0&limit=100')
    .then(function(response) {
      console.log("SPOTIFY SEARCHING FOR PLAYLIST " + req.params.id + "...", response.data.data);
      res.send(response.data);
    })
    .catch(function(err) {
      console.error(err)
      res.status(401).send();
    })

});

//GET LOGGED IN USER'S PLAYLISTS

app.get('/api/user/playlists', function(req, res) {

  console.log("Reached /me/playlists endpoint.");

  var token = " Bearer " + req.user.accessToken;

  axios.defaults.headers.common['Authorization'] = token;

  axios.get('https://api.spotify.com/v1/me/playlists?limit=50') //ALEX MADE A CHANGE
    .then(function(response) {
      console.log("SPOTIFY SEARCHING FOR USER PLAYLISTS...", response);
      res.send(response.data);
    });

});


//GET PLAYLIST SONGS

app.get('/api/user/playlists', function(req, res) {

  console.log("Reached /me/playlists endpoint.");

  var token = " Bearer " + req.user.accessToken;

  axios.defaults.headers.common['Authorization'] = token;

  axios.get('https://api.spotify.com/v1/me/playlists') //ALEX MADE A CHANGE
    .then(function(response) {
      console.log("SPOTIFY SEARCHING FOR USER PLAYLISTS...", response);
      res.send(response.data);
    });

});
//
///
//
//
//
//GET ALBUM SONGS BY ALBUM ID

app.get('/api/album/:id', function(req, res) {
  // req.params.name

  console.log("Reached /search for album by id endpoint.");

  // axios.defaults.headers.common['Authorization'] = req.user.accessToken;

  axios.get('https://api.spotify.com/v1/albums/' + req.params.id)
    .then(function(response) {
      console.log("SPOTIFY SEARCHING FOR ALBUM " + req.params.id + "...", response);
      res.send(response.data);
    });

});

// app.get('/api/user/playlists/:id', function(req, res) {
//
//   console.log("Reached /me/playlists endpoint.");
//
//   var token = " Bearer " + req.user.accessToken;
//
//   axios.defaults.headers.common['Authorization'] = token;
//     console.log('anything bruhhhhhhh');
//     console.log("user " + req.user.id);
//     console.log("params " + req.params.id);
//     console.log(axios.get('https://api.spotify.com/v1/users/' + req.user.id + '/playlists/' + req.params.id + '/tracks' ));
//
//   axios.get('https://api.spotify.com/v1/users/' + req.user.id + '/playlists/' + req.params.id + '/tracks'  )
//     .then(function(response) {
//       console.log("SONGS IN SEARCHED PLAYLIST...", response);
//       res.send(response);
//     });
// });


// DATABASE END POINT

app.post('/db/favorites', dbCtrl.addFavorite);

// PASSPORT
// ============================================================
passport.use(new passportSpotify({
        clientID: config.clientId,
        clientSecret: config.clientSecret,
        callbackURL: "http://localhost:3000/auth/spotify/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        profile.accessToken = accessToken;
        profile.refreshToken = refreshToken;
        db.users.findOne({username: profile.username}, function (err, user) {
          if (!user) {
            db.users.insert({
              username: profile.username,
              profileUrl: profile.profileUrl,
              followers: profile.followers
            }, function (error, newUser){
              console.log("USER NOT FOUND. INSERTED NEW USER: ", newUser);
              profile.db_id = newUser.id;
            });
          }
          else {
            console.log("USER FOUND: ", user);
            profile.db_id = user.id;
          }
          return done(null, profile);
        });
    }
));
passport.serializeUser(function(user, done) {
    // console.log(util.inspect(user));
    done(null, user);
})

passport.deserializeUser(function(id, done) {
    done(null, id);
})


// VARIABLES
// ============================================================
var port = 3000;

// LISTEN
// ============================================================
app.listen(port, function() {
    console.log('listening on port ', port);
});
