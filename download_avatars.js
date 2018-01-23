var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + process.argv[2] + "/" + process.argv[3] + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token' + token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));

  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
  for (var object of result) {
    downloadImageByURL(object.avatar_url, "./avatars/" + object.login + object.id);
    //console.log(object.avatar_url);
  }
});

function downloadImageByURL(url, filepath) {
  request.get(url)
         .on('error', function (err) {
          throw err;
         })
         .on('end', function() {
          console.log('Download complete.');
         })
         .pipe(fs.createWriteStream(filepath));
}
