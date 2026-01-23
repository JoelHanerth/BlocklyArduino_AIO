const remote = require("electron").remote;
// electron APIs
        window.appQuit = function() {
          remote.app.exit(0);
        };
// node modules
       window.notify= function notify(msg) {
       return require('node-notifier').notify(msg);
       };