var R = require('ramda');
var user = require('./github').user;

var filterData = R.pick([
    'avatar_url',
    'company',
    'email',
    'hireable',
    'location',
    'name'
  ]);


module.exports = user.getInfo().then(filterData);
