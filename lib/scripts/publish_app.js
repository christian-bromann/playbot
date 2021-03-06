var Util = require("./utils.js")
 
var PublishApp = function() {
  var util = new Util();
  this.runScript = function(client, userOptions) {

    util.init(client, userOptions);

    util.loginAndWait();

    util.step("Go to application page", function() {

    }, function() {
      util.action("Click on element", ['a', [userOptions.title, userOptions.title + " " + userOptions.version]]);
    });

    util.step("Wait for app page and begin publishing", function() {
      client.waitFor('ol', util.TIMEOUT, util.onTimeout("Wait for app page to load"));
    }, function() {
      util.action("Click on element", ['a', ['Re-publish this app', 'Publish this app']]);
    });

    util.step("Wait for publishing to complete", function() {
      client.waitFor('div[data-notification-type="INFO"][aria-hidden="false"]', util.TIMEOUT, util.onTimeout("Wait for publishing to complete"));
    }, function() {

    });    
  }
  
  return this;
}
 
exports = module.exports = PublishApp;
