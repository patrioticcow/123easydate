(function ($){
    console.log('6');
    $(document).bind('pageinit', "#mainPage", function () { console.log('main page init');
        console.log('7');

        $('#login_form').submit(function(e) {
            e.preventDefault();
            var serializeForm = serializeObject($(this).serializeArray());
            alert(JSON.stringify(serializeForm));

            function alertDismissed() {}
            console.log(serializeForm);
            $('#test').html(JSON.stringify(serializeForm));
            return false;
        });
    });


    function serializeObject(a) {
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
    };

})(jQuery);