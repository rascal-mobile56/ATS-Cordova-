/**
 * Created by madam on 7/28/16.
 */

$(document).ready(function() {
    var pin1,pin2,pin3,pin4;
    pin1 = window.localStorage["pin1"] ;
    pin2 = window.localStorage["pin2"];
    pin3 = window.localStorage["pin3"];
    pin4 = window.localStorage["pin4"];

    if(pin1 && pin2 && pin3 && pin4)
    {
        $('#pin1').val(pin1);
        $('#pin2').val(pin2);
        $('#pin3').val(pin3);
        $('#pin4').val(pin4);
    }
    if(window.localStorage["save_pin"])
    {
        $('#save_pin').prop('checked', true);
    }
    else{
        $('#save_pin').prop('checked', false);
    }

    $("#preloader").css('display','none');
    $("#state").css('display','none');

    var api_token =  window.localStorage["token"];
    var phone_number = window.localStorage["phone_N"];
    var pin_number = window.localStorage["pin_number"];
    var mobile_token = window.localStorage["mobile_token"];
    var bb = localStorage.getItem("aa");

    $("#login").on('click', function () {




        var pin = $('#pin1').val() + $('#pin2').val() + $('#pin3').val() + $('#pin4').val();

        if (pin != pin_number) {
            navigator.notification.alert("Your Pin Code is error", null, 'Error!', 'OK');
        } else {
            if ($('#save_pin').is(":checked")) {
                window.localStorage["pin1"] = $('#pin1').val();
                window.localStorage["pin2"] = $('#pin2').val();
                window.localStorage["pin3"] = $('#pin3').val();
                window.localStorage["pin4"] = $('#pin4').val();
                window.localStorage["save_pin"] = $("#save_pin").val();
            } else {
                localStorage.removeItem("pin1");
                localStorage.removeItem("pin2");
                localStorage.removeItem("pin3");
                localStorage.removeItem("pin4");
                localStorage.removeItem("save_pin");
            }
            if (bb) {

                $.ajax({

                    url: "http://ats-stage.herokuapp.com/api/v1/login?mobile_token=" + mobile_token +
                    "&phonenumber=" + phone_number + "&pin=" + pin,
                    method: 'GET',
                    contentType: 'application/json',
                    dataType: "json",
                    success: function (result) {
                        localStorage.removeItem("aa");
                        //API Token
                        window.localStorage["token"] = result.api_token;
                        //Go Profile page
                        window.location.href = "profile.html";

                    }, error: function (e) {
                        navigator.notification.alert("Your Server Request is Error", null, 'Fail!', 'OK');
                    }
                });
            } else {
            $.ajax({
                url: "http://ats-stage.herokuapp.com/api/v1/get_info?token=" + api_token +
                "&phonenumber=" + phone_number,
                method: 'GET',
                contentType: 'application/json',
                dataType: "json",
                success: function (result) {
                    window.location.href = "profile.html";
                }, error: function (e) {
                    localStorage.setItem("aa", 1);
                    window.location.href = "index2.html";
                    navigator.notification.alert("Sorry, there was a problem." +
                        " If your information is correct " +
                        "and the problem persists, contact your account representative.",
                        null, 'Error!', 'OK');
                }
            });
            }
        }
    });




    $("#forget").on('click', function () {

        localStorage.clear();
        window.location.href = "index.html";
    });
});