jQuery(document).ready(function($){


    jQuery('.view-systems-for-user .view-content table tr td.views-field-nothing a').on('click',function(e){
     console.log("testing");
        $.ajax({
        url: "send-mail",
        data:{query: "testing"},
        dataType:'json',
        success: function(result){
          console.log(result);
        }});

    });

    function startTimer(duration, display) {
        var start = Date.now(),
            diff,
            minutes,
            seconds;
          var interval;
        function timer() {
            // get the number of seconds that have elapsed since 
            // startTimer() was called
            diff = duration - (((Date.now() - start) / 1000) | 0);

            // does the same job as parseInt truncates the float
            minutes = (diff / 60) | 0;
            seconds = (diff % 60) | 0;

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds; 

            if (diff <= 0) {
                // add one second so that the count down starts at the full duration
                // example 05:00 not 04:59
               // start = Date.now() + 1000;
               clearInterval(interval);
               jQuery('#countdown-message').css('display','none');
               jQuery('#resend-message').css('display','block');
               jQuery('.ajax-link-container').css('display','block');
               jQuery('#countdown-status').val('inactive');
               
            }
        }
        // we don't want to wait a full second before the timer starts
       
        jQuery('#countdown-message').css('display','block');
         timer();
        interval = setInterval(timer, 1000);
}

    jQuery('#reset-pass #edit-resend-email-link').on('click',function(e){
       e.preventDefault();
       $.ajax({
        url: "resend-mail",
        data:{query: "testing"},
        dataType:'json',
         beforeSend: function(){
              jQuery('.loader').show();
          },
         complete: function(){
            jQuery('.loader').hide();
         },
        success: function(result){
          console.log(result);
          //result.status;

         // var status = "false";
          if(result.status == true){
              var code = result.dynamic_code;  
              jQuery('#dynamic-code').val(code);  
              jQuery('#countdown-status').val('active'); 
              jQuery('#resend-message').css('display','none');
              jQuery('#countdown-message').css('display','block');
              jQuery('.ajax-link-container').css('display','none');
               jQuery('#post-message').css('display','block');
                  var fiveMinutes = 60 * 5,
                display = document.querySelector('#time');
                startTimer(fiveMinutes, display);
                jQuery('#countdown-status').val('active');
          }else{
               
               jQuery('#post-message').text('Some thing goes wrong!, Contact to the site administrator');
               jQuery('#resend-message').css('display','none');  
               jQuery('.ajax-link-container').css('display','none');
               jQuery('#post-message').css('display','block');
          }
        }});

    });

    var countdownStatus = jQuery('#countdown-status').val();
    if (!countdownStatus) {

          var fiveMinutes = 60 * 5,
          display = document.querySelector('#time');
          startTimer(fiveMinutes, display);
          jQuery('#countdown-status').val('active');

    }

 function getUrlParams(urlOrQueryString) {
              if ((i = urlOrQueryString.indexOf('?')) >= 0) {
                const queryString = urlOrQueryString.substring(i+1);
                if (queryString) {
                  return _mapUrlParams(queryString);
                } 
              }

              return {};
            }
function _mapUrlParams(queryString) {
              return queryString    
                .split('&') 
                .map(function(keyValueString) { return keyValueString.split('=') })
                .reduce(function(urlParams, [key, value]) {
                  if (Number.isInteger(parseInt(value)) && parseInt(value) == value) {
                    urlParams[key] = parseInt(value);
                  } else {
                    urlParams[key] = decodeURI(value);
                  }
                  return urlParams;
                }, {});
        } // end of the function.
    var urlParams = getUrlParams(location.search);
    var status =  urlParams.hasOwnProperty("status"); 
      if(status){
         if(urlParams.status == "true"){
            var queryParams = new URLSearchParams(window.location.search);
            queryParams.set("status", "false");
            history.replaceState(null, null, "?"+queryParams.toString()); 
         }
      }   


});

// (function ($, Drupal, once) {
//   Drupal.behaviors.drupal_dialog = {
//   		console.log("Hello world!");

//       // $.ajax({url: "demo_test.txt", success: function(result){
//       //  $("#div1").html(result);
//       // }});
        
//       //   $.ajax({
//       //     url: Drupal.url('tm_analytics/check_group_status'),
//       //     type: "POST",
//       //     contentType: "application/json; charset=utf-8",
//       //     dataType: "json",
//       //     success: function (response) {
//       //     }
//       //   });
 

//   };
// })(jQuery, Drupal, once);