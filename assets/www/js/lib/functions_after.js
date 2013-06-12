var LocalDatabase = {

    db: function () {
        var db = window.openDatabase("eadydate", "1.0", "EasyDate DB", 1000000);
        db.transaction(
            function(tx){
                tx.executeSql('CREATE TABLE IF NOT EXISTS users (name text, email text, password text, active integer, created integer)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS userdetails (user_id integer, dob integer, gender integer, relationship_status integer, seeking integer, body_type integer, ethnicity integer, height integer)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS hangout (user_id integer, seeking integer, street text, city text, state text, zip integer, time_start integer, time_end integer, details text, status integer, created integer)');
            });
    },
    insert: function (type, data) {
        var db = window.openDatabase("eadydate", "1.0", "EasyDate DB", 1000000);
        if(type === 'users'){
            var name = window.localStorage.getItem("name");
            if(!name){
                console.log('2');
                db.transaction(
                    function(tx){
                        tx.executeSql('INSERT INTO users (name, email, password, active, created) VALUES (data.name, data.email, data.password, 1, Misc.time())');
                    },
                    function(err){
                        console.log("Error processing SQL: "+err.code);
                    },
                    function(){
                        console.log('success');
                        window.localStorage.setItem("name", data.name);
                        window.localStorage.setItem("email", data.email);
                        window.localStorage.setItem("loggedin", 1);
                    }
                );
            }
        }
    }

}
// create some tables
LocalDatabase.db;

var LocalStorage = {
    type: "test",
    checkIfLoggedIn: function () {
        return true;
    }
}

var User = {
    type: "test",
    checkIfLoggedIn: function () {
        return true;
    }
}

var Misc = {
    validateForm: function (form) {
        var name            = $('.'+form).find("[data-name='name']");
        var email           = $('.'+form).find("[data-email='email']");
        var password        = $('.'+form).find("[data-password='password']");
        var repeatPassword  = $('.'+form).find("[data-repeat-password='repeat-password']");

        if (typeof name !== "undefined") {
            if(name.val() === '' ){ alert('Name field is empty'); return false; }
            if(name.val().length < 3){ alert('Name needs to be at least 3 characters'); return false; }
        }
        if (typeof email !== "undefined") {
            if(email.val() === '' ){ alert('Email field is empty'); return false; }
            if(this.validateEmail(email.val()) != true){ alert('Email not valid'); return false; }
        }
        if (typeof password !== "undefined") {
            if(password.val() === '' ){ alert('Password field is empty'); return false; }
            if(password.val().length < 5 ){ alert('Password needs to be at least 5 characters'); return false; }
        }
        if (typeof repeatPassword !== "undefined") {
            if(repeatPassword.val() === '' ){ alert('Repeat Password field is empty'); return false; }
            if(repeatPassword.val() !== password.val() ){ alert('Passwords don\'t match'); return false; }
        }
    },

    validateEmail: function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    serializeObject: function(a) {
        var o = {};
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    },

    time: function(){
        return Math.round(new Date().getTime() / 1000);
    }
}

// #indexPage
$(document).on('pagecreate', '#indexPage', function (e) { console.log('%c pagecreate indexPage', 'background: #222; color: #bada55');
    if (User.checkIfLoggedIn()){
        //$.mobile.changePage( "main.html");
    }
});
$(document).on('pageinit', '#indexPage', function (e) { console.log('%c pageinit indexPage', 'background: #222; color: #bada55'); });
$(document).on('pagebeforeshow', '#indexPage', function (e) { console.log('%c pagebeforeshow indexPage', 'background: #222; color: #bada55');
    $(document).on('click', '#login', function() {
        Misc.validateForm('login_form');
    });

    $(document).on('click', '#create_account', function() {
        Misc.validateForm('create_account_form');
        var form = $('.create_account_form');
        var formData = form.serialize();
        var formDataJson = Misc.serializeObject(form.serializeArray());

        // TODO save data to server and local database
        LocalDatabase.insert('users', formDataJson);
    });
});

// #mainPage
$(document).on('pagebeforeshow', '#mainPage', function (e) { console.log('%c pagebeforeshow secondPage', 'background: #222; color: #bada55');

});
$(document).on('pagecreate', '#mainPage', function (e) { console.log('%c pagecreate secondPage', 'background: #222; color: #bada55');

});
$(document).on('pageinit', '#mainPage', function (e) { console.log('%c pageinit secondPage', 'background: #222; color: #bada55');
    $('#map_canvas').gmap().bind('init', function(evt, map) {
        $('#map_canvas').gmap('addMarker', { /*id:'m_1',*/ 'position': '42.345573,-71.098326', 'bounds': true } );
    });
});
$(document).on('pageshow', '#mainPage', function (e) { console.log('%c pageshow secondPage', 'background: #222; color: #bada55');
    //$('#map_canvas').gmap('refresh');
});