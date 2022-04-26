const Registry = require('../model/registry');
const registry = require('../models/registry');

module.exports = {
    create,
    delete: deleteItem
  };


  function deleteItem(req, res, next) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    Registry.findOne({'items._id': req.params.id, 'items.user': req.user._id}).then(function(registry) {
      // Rogue user!
      if (!registry) return res.redirect('/registry');
      // Remove the review using the remove method available on Mongoose arrays
      registry.items.remove(req.params.id);
      // Save the updated movie
      registry.save().then(function() {
        // Redirect back to the movie's show view
        res.redirect(`/registry/${registry._id}`);
      }).catch(function(err) {
        // Let Express display an error
        return next(err);
        // res.redirect(`/movies/${movie._id}`);
      });
    });
  }
  
  
  function create(req, res) {
    Registry.findById(req.params.id, function(err, registry) {
      req.body.user = req.user._id;
      req.body.userName = req.user.name;
      req.body.userAvatar =  req.user.avatar;
      registry.items.push(req.body);
      // Save the updated movie doc
      registry.save(function(err) {
        // Step 5 says to redirect
        res.redirect(`/registries/${req.params.id}`);
      });
    });
  }