var app = {
    initialize: function() {
        console.log('1');
        this.bindEvents();
    },
    bindEvents: function() {
        console.log('2');
        if(screen.width < 800){
            var mvp = document.getElementById('testViewport');
            mvp.setAttribute('content','user-scalable=yes, initial-scale=1.5, maximum-scale=2, minimum-scale=1, width=device-width, target-densityDpi=180');
        }
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        console.log('3');
        app.receivedEvent();
    },
    receivedEvent: function() {
        console.log('4');
        $.mobile.changePage("main.html");
    }
};

$(document).ready(function() {
    console.log('5');
    initFastButtons();
})

$(document).bind("mobileinit", function () {
    console.log('mobileinit');
    $.support.cors                      = true;
    $.mobile.buttonMarkup.hoverDelay    = 0
    $.mobile.allowCrossDomainPages      = true;
    $.mobile.defaultPageTransition      = 'none';
    $.mobile.defaultDialogTransition    = 'none';
    $.mobile.useFastClick               = false;
    $.mobile.touchOverflowEnabled       = true;
    $.mobile.loadingMessageTextVisible  = true;
    $.mobile.phonegapNavigationEnabled  = true;
})
