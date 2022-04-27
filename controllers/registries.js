const registry = require('../models/registry');
const Registry = require('../models/registry');
const items = require('./items');


module.exports = {
    index,
    new: newRegistry,
    create,
    show


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

  function show(req, res) {
    Registry.findById(req.params.id, function(err, registry) {
 
      
      res.render('registries/show.ejs', { registry, title: 'title' });
    });
  }

//   function show(req, res) {
//  Registry.findById(req.params.id)
//       .populate('item')
//       .exec(function(err, movie) {
//         items.find(
//           {_id: {$nin: registry.items}},
//           function(err, items) {
//             console.log(items);
//             res.render('registries/show', { title: 'Movie Detail', movie, performers });
//           }
//         );
//       });
//   }
 