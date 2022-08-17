var express = require('express');
var router = express.Router();
const passport = require('passport');
const Registry = require("../models/registry");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const registries = await Registry.find()
    .populate("items")
    .sort({ createdAt: "desc" });
  res.render("index", { registries });
});

router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  }
));
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;

