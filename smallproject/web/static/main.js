
var enabled = 0;
function navflip() {
    if(enabled == 0 ){
        w3_open();
    }
    else if(enabled == 1){
        w3_close();
    }
}

function w3_open() {
    enabled = 1;
    document.getElementById("body").classList.remove('w3-animate-right');
    document.getElementById("body").classList.add('w3-animate-left');
    document.getElementById("content").style.marginLeft = "15%";
    document.getElementById("nav-sidebar").style.width = "15%";
    document.getElementById("nav-sidebar").style.display = "block";
}
function w3_close() {
    enabled = 0;
    document.getElementById("body").classList.remove('w3-animate-left');
    document.getElementById("body").classList.add('w3-animate-right');
    document.getElementById("content").style.marginLeft = "0%";
    document.getElementById("nav-sidebar").style.display = "none";
}

function loadLogin() {
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         document.getElementById("content").innerHTML = this.responseText;
      }
   };
   xhttp.open("GET", "login.html", true);
   xhttp.send();
}

function loadRegister() {
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         document.getElementById("content").innerHTML = this.responseText;
      }
   };
   xhttp.open("GET", "register.html", true);
   xhttp.send();
}

function login() {

    var g_email = $("input[name='email']").val();
    var g_password = $("input[name='password']").val();

    $.ajax({	
		url: "http://35.227.78.91/login", 
		type: 'post', 
		data: { 
			email: g_email, 
			password: g_password
		}, 
		success: function(result){
        	console.log(result);
    }});
}
