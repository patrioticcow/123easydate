/* PhoneGap plugin constructors */

// Downloader
cordova.define("cordova/plugin/downloader", function (require, exports, module) {
    var exec = require("cordova/exec");
	module.exports = {
        get: function (message, win, fail) {
			exec(win, fail, "Downloader", "get", [message]);
		}
    };
});

// DeleteCached
cordova.define("cordova/plugin/deletecached", function (require, exports, module) {
    var exec = require("cordova/exec");
	module.exports = {
        del: function (message, win, fail) {
			exec(win, fail, "DeleteCached", "del", [message]);
		}
    };
});

// Share
cordova.define("cordova/plugin/share", function (require, exports, module) {
    var exec = require("cordova/exec");
	module.exports = {
        show: function (message, win, fail) {
			exec(win, fail, "Share", "show", [message]);
		}
    };
});

// CheckKey
cordova.define("cordova/plugin/checkkey", function(require, exports, module) {
	var exec = require("cordova/exec");
	module.exports = {
		get: function (win, fail) {
			exec(win, fail, "CheckKey", "get",[]);
		}
	};
});

// CheckPackage
cordova.define("cordova/plugin/checkpackage", function(require, exports, module) {
	var exec = require("cordova/exec");
	module.exports = {
		get: function (win, fail) {
			exec(win, fail, "CheckPackage", "get",[]);
		}
	};
});

// Appstore intents
cordova.define("cordova/plugin/appstore", function (require, exports, module) {
    var exec = require("cordova/exec");
	module.exports = {
        show: function (message, win, fail) {
			exec(win, fail, "Appstore", "show", [message]);
		}
    };
});

/* END PhoneGap constructors */