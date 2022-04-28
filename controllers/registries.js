const registry = require("../models/registry");
const Registry = require("../models/registry");
const items = require("./items");

module.exports = {
  index,
  new: newRegistry,
  create,
  show,
  delete: deleteRegistry,
  update,
  edit,
};

function index(req, res) {
  Registry.find({}, function (err, registries) {
    res.render("registries/index", { title: "All registries", registries });
  });
}

function newRegistry(req, res) {
  res.render("registries/new", { title: "Add Registry" });
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  req.body.user = req.user._id; // assign the logged in user's _id to relate this doc to the user
  var registry = new Registry(req.body);
  // registry.user = req.body.id;
  registry.save(function (err) {
    // one way to handle errors
    if (err) return res.redirect("/registries/new");
    console.log(registry);
    res.redirect(`/registries/${registry._id}`);
  });
}

function show(req, res) {
  Registry.findById(req.params.id, function (err, registry) {
    console.log(registry);
    res.render("registries/show.ejs", { registry, title: "title" });
  });
}

function edit(req, res) {
  Registry.findOne(
    { _id: req.params.id, userRecommending: req.user._id },
    function (err, registry) {
      if (err || !registry) return res.redirect("/registries");
      res.render("registries/edit", { registry });
    }
  );
}

function update(req, res) {
  Registry.findOneAndUpdate(
    { _id: req.params.id, userRecommending: req.user._id },
    // update object with updated properties
    req.body,
    // options object with new: true to make sure updated doc is returned
    { new: true },
    function (err, registry) {
      if (err || !registry) return res.redirect("/registries");
      res.redirect(`/registries/${registry._id}`);
    }
  );
}

function deleteRegistry(req, res) {
  Registry.findOneAndDelete(
    // Ensue that the book was created by the logged in user
    { _id: req.params.id, userRecommending: req.user._id },
    function (err) {
      // Deleted book, so must redirect to index
      res.redirect("/registries");
    }
  );
}
