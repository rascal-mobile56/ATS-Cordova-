
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {

        //window.plugins.sim.getSimInfo(successCallback, errorCallback);
        //
        //function successCallback(result) {
        //    //console.log(result);
        //    //alert("Your Phone Number is "+JSON.stringify(result.phoneNumber));
        //    var device = result.phoneNumber;
        //
        //    window.localStorage["device"] = device;
        //}
        //function errorCallback(error) {
        //    //console.log(error);
        //    alert(JSON.stringify(error));
        //}
    }
};

app.initialize();