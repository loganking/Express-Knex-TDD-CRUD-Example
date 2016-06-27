var express = require('express'),
    router = express.Router(),
    puppies = require('./api_v1/puppies');

router.use('/puppies', puppies);

module.exports = router;
