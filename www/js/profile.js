/**
 * Created by madam on 7/27/16.
 */



$(document).ready(function() {

    var m_names = new Array("January", "February", "March",
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December");

    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();

    var today = '<span>'+' '+m_names[curr_month]+' '+'</span><span style="color: deepskyblue;">'
        +' '+curr_date+' '+'</span><span>'+curr_year+'</span>';

    $('.today').append(today);

    var api_token =  window.localStorage["token"];
    var phone_number = window.localStorage["phone_N"];
    var pin_number = window.localStorage["pin_number"];
    //alert(api_token);
    var url ="http://ats-stage.herokuapp.com/api/v1/get_info?token="+api_token+"&phonenumber="+phone_number;
    $.ajax({
        url:url,
        method: 'GET',
        contentType: 'application/json',
        dataType:"json",
        success: function (result) {

            $("#preloader").css('display','none');
            $("#state").css('display','none');


            //User Username
            var f_customer = result.customer.first_name;
            var l_customer = result.customer.last_name;
            var customer ='<p class="customer"><b>'+f_customer+' '+l_customer+'</b></p>';

            //Agent Username and his available & invalid
            var first_rep = result.rep.first_name;
            var last_rep = result.rep.last_name;

            var agent = '<p class="per">your personal</p>'+
                        '<p class="per">agent</p><p class="bob"><b>'
                        +first_rep+' '+last_rep+'</b></p>'+'<div class="available">'+
                        '<p id="av">Available</p>'+
                        '<p id="iv">Not Available</p>'+
                        '<img src="img/avail.png" id="avail">'+
                        '<img src="img/invalid.png" id="invalid">'+
                        '</div>';

            //Phone Call
            var number =result.rep.phone;
            var call = number.replace(/[^0-9]/g, '');
            window.localStorage["call"] = call;
            var agent_call = '<a '+'href="tel:+'+call+'">call agent</a><a href="sms:'+ call+'">text agent</a>';
            //Agent Profile Photo
            var avatar_photo = result.rep.avatar;
            var photo = '<img src="'+avatar_photo+'" style="width: 100%; height: 100%;">';




            //Game Plan
            for (var i=0;i<result.picks.length;i++)
            {
                var select = result.picks[i].purchased_content;
                $('#game').append(select);
            }

            // Result
            $('.head1').append(customer);
            $('.property').append(agent);
            $('.agent').append(agent_call);
            if(result.rep.available==true)
            {
                $('#av').show();
                $('#avail').show();
            } else {
                $('#iv').show();
                $('#invalid').show();
            }

            $('#photo').append(photo);

            $("#game p:nth-child(3n-0)").append("<div class='cell'></div>");

            var noti_msg ="";

            for (var j=0;j<result.notifications.length;j++)
            {
                var noti = result.notifications[j].message;

                //navigator.notification.alert(noti, null, 'Notification!', 'OK');
                noti_msg += '<p>'+ noti + '</p>';

            }
            $('.yellow').append(noti_msg);

        }, error: function (e) {
            $("#preloader").css('display','none');
            $("#state").css('display','none');
            navigator.notification.alert("Your Server Request is Error", null, 'Error!', 'OK');
        }
    });

    $("#logout").on('click', function () {

        if(!pin_number)
        {
            window.location.href = "index.html";
        }else{
            window.location.href = "index2.html";
        }
    });
});
