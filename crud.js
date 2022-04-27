require('dotenv').config();
require('./config/database');

const Registry = require('./models/registy');

// const registry = require('./models/registry');


Registry.find({}, function(err, registryDocs) {
  Registry = registryDocs;
});
