<!DOCTYPE html>
<html>
   <head>
      /* link tag */
      <link rel="stylesheet" href="css/style.css"/>
      <link rel="stylesheet" href="http://mypage.com/style.css"/>


      /* style tag */
      <style>
         p {color: black}
      </style>

    </head>
   <body style="background-color: #C0C0C0"> 

p { 
   color: red;
   text-align: center;
}

<script>

$(document).ready(function(){
var object = $('.briefcitRow');
   if (object.length > 0) {
          if ((location.search.indexOf('searchtype=X') !== -1 
            && location.search.indexOf('searchscope=2') !== -1) 
            || (location.search.indexOf('SUBKEY=') !== -1) ||
         (location.pathname.indexOf('search~S2/X'))){
            var oclcNums = [];
               $('.briefcitRow').each(function(){
                  var oclcNum = $(this).find('.oclc').html();
                  oclcNum = $.trim(oclcNum);
                  $(this).attr('id','oclc'+oclcNum);
                  oclcNums.push("OCLC:"+oclcNum);
               });


            $.ajax({
              url: 'http://books.google.com/books?bibkeys='
                    + oclcNums.join(',')
                    + '&jscmd=viewapi&callback?',
              cache: false,
              dataType: 'jsonp',
              success: function (results) {
                  for(var num in results){
                     var result = results[num];
                     var oclc_num = num.replace("OCLC:",'');
                     if(result.thumbnail_url !== undefined){
                        $('#oclc'+oclc_num+' .BookJacket').attr('src',result.thumbnail_url);
                     }

                     $('#oclc'+oclc_num+' .briefcitPreview')
                     .append('<div style="margin-top: 10px;"><a href="'
                        + result.preview_url
                        + '"><img src="/screens/google_preview_button.png"/></a></div>');
                  }
               }
            });
      
      }
   
   }
});

    $(document).ready(function(){
        $(".bibDisplayUrls table  th:first-child" )
        .html("<span style='font-size: 14px; color: #F00000;'>Access Online</span>");
    });


  $('#sendMeCallNumber').click(function(e) {
      e.preventDefault();
      var patronEmail = $('#sendMeCallNumEmail').val();
      var callNumber = $('#tabmenu_availability .bibItemsEntry').text();
      var titleSent = $('#bibDetailTop table .bibInfoEntry table tr:nth-of-type(1) td:nth-child(2)').text();

      $.ajax({
          type: 'POST',
          url: 'https://mandrillapp.com/api/1.0/messages/send.json',
          data: {
          'key': 'XXSSDSDIQpzJFdBUiBVQ',
          'message': {
            'from_email': 'libcirc@university.edu',
            'to': [
              {
              'email': patronEmail,
              'type': 'to'
              }
            ],
            'subject': 'Sent from Law Library Catalog',
            'html': 'Title: ' + titleSent + '<br /> Location: ' + callNumber
          }
          }
       })
       .done(function(response) {
          $('#sendMeCallNumModal .modal-body').text('Susccessfully emailed to ' + response[0].email + '.');
           console.log(response); 
       })
       .fail(function() {
          $('#sendMeCallNumModal .modal-body').text('Sorry, failed to email');
       });  
    
      setTimeout(function(){
        $('#sendMeCallNumModal').modal('hide');
      }, 3000); 


  });


</script>