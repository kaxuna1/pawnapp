$(function() {
    if($('body').data('page') == 'login'){

        /* Show / Hide Password Recover Form */
        $('#login').on('click', function(e) {
            e.preventDefault();
            $('.form-password').slideUp(300, function() {
                $('.form-signin').slideDown(300);
            });
        });
        $('#submit-form, #submit-password').click(function(e) {
            e.preventDefault();
            var l = Ladda.create(this);
            l.start();
            $.ajax({
                url: "loginapi",
                method: "POST",
                data: { username: $("#username").val(), password: $("#password").val()  }
            }).done(function( msg ) {
                if(msg["id"]){
                    console.log(msg)
                    createCookie("projectSessionId",msg["id"],365);
                    createCookie("projectUserType",msg["user"]["type"],365);
                    createCookie("userId",msg["user"]["id"],365);
                    console.log(readCookie("projectSessionId"));
                    //l.stop();
                    window.location.href = "/";
                }
                else{
                    l.stop();
                    alert("მომხმარებელი ან პაროლი არის არასწორი")
                }


            })
           /* setTimeout(function() {
                window.location.href = "dashboard.html";
            }, 2000);*/
        });

    }

});
