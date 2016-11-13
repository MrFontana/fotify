var app = require('../server');
var db = app.get('db');


module.exports = {

addFavorite: function (req, res) {
  if (!req.user) {
    res.json('Not logged in.');
  }
  db.user_favorites.insert({
    user_id: req.user.db_id,
    track_id: req.body.track_id
  }, function(err, newFavorite){
    if (err) {
      console.log("ERROR ADDING FAVORITE TO DB: ", err);
      res.send(err);
    }
    console.log("ADDED FAVORITE TO DB: ", newFavorite);
    res.send(newFavorite);
  });
}

}
