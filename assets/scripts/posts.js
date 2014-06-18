var R = require('ramda');
var branch = require('./github').branch;

R.replace = R.invoker('replace', String.prototype);

var filterData = R.project( ['name', 'sha', 'path'] );

var removeFiletype = R.replace('.md', '');
var name = R.compose(R.split('-'), R.prop('name'));

var createDate = R.compose(R.join('-'), R.take(3), name);
var createTitle = R.compose(removeFiletype, R.join(' '), R.skip(3), name);
var composePostInfo = R.compose(R.map(function (post) {
    post.title = createTitle(post);
    post.date = createDate(post).replace('.md', '');
    return post;
  }));

var logit = function(data) {
  console.log(data);
};

module.exports = branch.contents('posts')
  .then(JSON.parse)
  .then(filterData)
  .then(composePostInfo);

