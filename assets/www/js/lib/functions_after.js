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
                db.transaction(
                    function(tx){
                        tx.executeSql('INSERT INTO users (name, email, password, active, created) VALUES ("'+data.name+'", "'+data.email+'", "'+data.password+'", 1, '+Misc.time()+')');
                    },
                    function(err){ console.log(err); },
                    function(){
                        window.localStorage.setItem("name", data.name);
                        window.localStorage.setItem("email", data.email);
                        window.localStorage.setItem("loggedin", 1);
                    }
                );
            }
        }
    },
    query: function (type, data) {
        var db = window.openDatabase("eadydate", "1.0", "EasyDate DB", 1000000);
        if(type === 'login'){
            db.transaction(
                function(tx){
                    tx.executeSql('SELECT * FROM users WHERE email = "'+data.email+'" AND password = "'+data.password+'"', [], querySuccess ,queryError);
                },
                queryError
            );
        }
        function queryError(err) { console.log(err); }

        function querySuccess(tx, results) {
            var len = results.rows.length;
            for (var i=0; i<len; i++){
                Misc.showAlert(JSON.stringify(results.rows.item(i)), 'test');
            }
        }
    }

}

// create some tables
LocalDatabase.db();

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

        if (name.length !== 0) {
            if(name.val() === '' ){ this.showAlert('Name field is empty', 'Error'); return false; }
            if(name.val().length < 3){ this.showAlert('Name needs to be at least 3 characters', 'Error'); return false; }
        }
        if (email.length !== 0) {
            if(window.localStorage.getItem("email")) { this.showAlert('Duplicate email, Please enter a different one.', 'Error'); return false; }
            if(email.val() === '' ){ this.showAlert('Email field is empty', 'Error'); return false; }
            if(this.validateEmail(email.val()) != true){ this.showAlert('Email not valid', 'Error'); return false; }
        }
        if (password.length !== 0) {
            if(password.val() === '' ){ this.showAlert('Password field is empty', 'Error'); return false; }
            if(password.val().length < 5 ){ this.showAlert('Password needs to be at least 5 characters', 'Error'); return false; }
        }
        if (repeatPassword.length !== 0) {
            if(repeatPassword.val() === '' ){ this.showAlert('Repeat Password field is empty', 'Error'); return false; }
            if(repeatPassword.val() !== password.val() ){ this.showAlert('Passwords don\'t match', 'Error'); return false; }
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
    },

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    }
}

// #indexPage
$(document).on('pagecreate', '#indexPage', function (e) { console.log('%c pagecreate indexPage', 'background: #222; color: #bada55');
    if(window.localStorage.getItem("loggedin")) { $.mobile.changePage( "main.html"); }
});
$(document).on('pageinit', '#indexPage', function (e) { console.log('%c pageinit indexPage', 'background: #222; color: #bada55');
    if(window.localStorage.getItem("loggedin")) { $.mobile.changePage( "main.html"); }
});
$(document).on('pagebeforeshow', '#indexPage', function (e) { console.log('%c pagebeforeshow indexPage', 'background: #222; color: #bada55');
    if(window.localStorage.getItem("loggedin")) { $.mobile.changePage( "main.html"); }
    $(document).on('click', '#login', function() {
        if (Misc.validateForm('login_form') !== false) {
            var form = $('.login_form');
            var formDataJson = Misc.serializeObject(form.serializeArray());
            LocalDatabase.query('login', formDataJson);
        }
    });

    $(document).on('click', '#create_account', function() {
        if (Misc.validateForm('create_account_form') !== false) {
            var form = $('.create_account_form');
            var formData = form.serialize();
            var formDataJson = Misc.serializeObject(form.serializeArray());

            // TODO save data to server and local database
            LocalDatabase.insert('users', formDataJson);
        }
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