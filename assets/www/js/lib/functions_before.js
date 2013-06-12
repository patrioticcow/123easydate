$(document).on('mobileinit', function (e) {
	$.mobile.zoom.enabled = false;
	$.mobile.pushStateEnabled = false;
	$.mobile.buttonMarkup.hoverDelay = 0;
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	$.event.special.swipe.scrollSupressionThreshold = 40;
	$.event.special.swipe.durationThreshold = 1000;
	$.event.special.swipe.horizontalDistanceThreshold = 30;
	$.event.special.swipe.verticalDistanceThreshold = 40;

    $.support.cors                      = true;
    $.mobile.allowCrossDomainPages      = true;
    $.mobile.touchOverflowEnabled       = true;
    $.mobile.loadingMessageTextVisible  = true;
    $.mobile.phonegapNavigationEnabled  = true;
});

// device ready
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	document.addEventListener("resume", onResume, false);
	document.addEventListener("pause", onPause, false);
}

function onPause() {

}

function onResume() {

}
