const Registry = require('../models/registry');


module.exports = {
    index,
    new: newRegistry,
    create,


};

function index(req, res) {
  Registry.find({}, function(err, registries) {
      res.render('registries/index', { title: 'All registries', registries });
    });
  }
  

  
  
  function newRegistry(req, res) {
    res.render('registries/new', { title: 'Add Registry' });
  }
  
  function create(req, res) {
    req.body.eventType = !!req.body.eventType; // there is no eventType in the schema
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
    }
    req.body.user = req.user._id;      // assign the logged in user's _id to relate this doc to the user
    var registry = new Registry(req.body);
    registry.save(function(err) {
      // one way to handle errors
      if (err) return res.redirect('/registries/new');
      console.log(registry);
      res.redirect(`/registries/${registry._id}`);
    });
  }
  