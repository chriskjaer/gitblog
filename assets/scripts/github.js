var USER = 'chriskjaer',
    REPO = 'gitblog',
    BRANCH = 'master',
    TOKEN = '95ccfc10cbdccf6651650f9099f423641daef216'; // Public Read Access Only

var github = new Octokit({ token: TOKEN });
var repo = github.getRepo(USER, REPO);

module.exports.branch = repo.getBranch(BRANCH);
module.exports.user = github.getUser(USER);

