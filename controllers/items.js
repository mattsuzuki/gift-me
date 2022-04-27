const Item = require("../models/registry");
const Registry = require("../models/registry");

module.exports = {
  create,
  delete: deleteItem,
};

function deleteItem(req, res, next) {
  Registry.findOne({
    "items._id": req.params.id,
    "items.user": req.user._id,
  }).then(function (registry) {
    if (!registry) return res.redirect("/registry");

    registry.items.remove(req.params.id);
    // Save the updated movie
    registry
      .save()
      .then(function () {
        res.redirect(`/registries/${registry._id}`);
      })
      .catch(function (err) {
        return next(err);
      });
  });
}

function create(req, res) {
  Registry.findById(req.params.id, function (err, registry) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    registry.items.push(req.body);
    // Save the updated movie doc
    registry.save(function (err) {
      // Step 5 says to redirect
      res.redirect(`/registries/${req.params.id}`);
    });
  });
}
