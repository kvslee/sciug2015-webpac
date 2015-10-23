
$(document).ready(function() {

	 $( '.clickNextSection' ).click(function() {
		var nextElem = $(this).parents("section").next();
		console.log(nextElem);

         if($( nextElem ).is(":visible")){
              $( nextElem ).css("display", "none");
         } else{
              $( nextElem ).css("display", "block");
         }
    });


    /* plain javascript */
	document.querySelector('button.jsAct').onclick = function() {
		document.getElementById('jsAct').innerHTML = Date();
	}

	// /* jquery */
	// $('button.jsAct').click(function() {
	// 	$('#jsAct').html(Date());
	// });



	/* AJAX in plain javascript */
	document.querySelector('button.ajaxDemo').onclick = function() { 
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4 && xhr.status == 200) {
		  	var arr = JSON.parse(xhr.responseText);
		  	var emailList = "<table>";
    		for(var i = 0; i < arr.length; i++) {
		        emailList += "<tr><td>" 
		        + arr[i].From 
		        + ": </td> <td><a href=''>" 
		        + arr[i].Subject 
		        + "</a></td></tr>";
		    }
		    emailList += "</table>";
			document.getElementById('ajaxDemo').innerHTML = emailList;
		  }
		}
		xhr.open("GET","https://sciug2015-webpac.herokuapp.com/email");
		xhr.send();
	}


	document.querySelector('button.ajaxDemo2').onclick = function() { 

		var from = document.querySelector("input#from").value;
		var subject = document.querySelector("input#subject").value;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4 && xhr.status == 200) {
			document.getElementById('ajaxDemo2').innerHTML = "Message Sent";
		  }
		}
		xhr.open("POST","https://sciug2015-webpac.herokuapp.com/email");
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');		
		xhr.send("From="+from+"&Subject="+subject);

		document.querySelector("input#from").value = '';
		document.querySelector("input#subject").value = '';
	}


	/* Ajax in jQuery */
	// $('button.ajaxDemo').click(function() { 
	// 	$.ajax({
	// 		method: "GET",
	// 		url: "http://localhost:3000/email",
	// 	}).done(function(arr) {
	// 	  	var emailList = "<table>";
	// 		for(var i = 0; i < arr.length; i++) {
	// 	        emailList += "<tr><td>" 
	// 	        + arr[i].From 
	// 	        + ": </td> <td><a href=''>" 
	// 	        + arr[i].Subject 
	// 	        + "</a></td></tr>";
	// 	    }
	// 	    emailList += "</table>";
	// 		$('#ajaxDemo').html(emailList);		
	// 	});
	// });

	// $('button.ajaxDemo2').click(function() {
	// 	var formData = $("form#ajaxdemo").serialize();
	// 	$.ajax({
	// 		method: "POST",
	// 		url: "http://localhost:3000/email",
	// 		data: formData,
	// 	}).done(function() {
	// 		$('ajaxDemo2').html("Message Sent");
	// 	})
	// 	$("input#from").val('');
	// 	$("input#subject").val('');		
	// })




});


