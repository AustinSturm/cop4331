
var enabled = 0;

function navflip() {
        w3_open();
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

// Modifies the contents of the content div with whatever page.html you send into this function... send file name as a string pls!
function loadContent(pagename) {
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         document.getElementById("content").innerHTML = this.responseText;
      }
   };
   xhttp.open("GET", pagename, true);
   xhttp.send();
}

var api_key_G = ""

function register() {
    var g_email = $("input[name='email']").val();
    var g_password = $("input[name='password']").val();
    var g_username = $("input[name='username']").val();

    $.ajax({
        url: "http://35.227.78.91/register",
        type: 'post',
        data: {
            name: g_username,
            email: g_email,
            password: g_password
        },
        success: function(result){
            alert('You are now registered! Please login.');
            loadContent("login.html");
        },
        error: function(result){
            loadContent("failRegister.html");
    }});
}
function logout() {
    document.cookie = "api_key=;";
    document.getElementById("username").innerHTML = "menu";
    document.getElementById("nav-sidebar").innerHTML = "";
    loadContent("login.html");
}

var api_key_G = ""

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
        document.cookie = 'api_key=' + result.api_key
        api_key_G = result.api_key
        document.getElementById("username").innerHTML = "menu";
        console.log(result);
        renderContacts();
        loadContent("welcomeUser.html");
        },
        error: function(result){
            loadContent("failLogin.html");
        }

});
}

function renderContact(id) {
    $.ajax({
        url: "http://35.227.78.91/user/contacts",
        type: 'post',
        data: {
            api_key: api_key_G
        },
        success: function(result){
         var contactResponse = "";
         $.each(result, function(index){
            contactResponse += "<a href='#' class='w3-bar-item w3-button w3-border' onclick='renderContact(result[index].ContactID)'>" + result[index].contact_name + "</a>";
         });

            document.getElementById("nav-sidebar").innerHTML = contactResponse;
    	    console.log(result);
    }});
}


function renderContacts() {

    $.ajax({
		url: "http://35.227.78.91/user/contacts",
		type: 'post',
		data: {
			api_key: api_key_G
		},
		success: function(result){
         var contactResponse = "";
         $.each(result, function(index){
            contactResponse += "<a href='#' class='w3-bar-item w3-button w3-border' onclick='renderContact(result[index].ContactID)'>" + result[index].contact_name + "</a>";
         });

        	document.getElementById("nav-sidebar").innerHTML = contactResponse;
         console.log(result);
    }});
}
// Copy paste of above function except it takes a parameter on request... Used when refreshing during an active session.
function renderContacts_reload(api_key_G) {

    $.ajax({
                url: "http://35.227.78.91/user/contacts",
                type: 'post',
                data: {
                        api_key: api_key_G
                },
                success: function(result){
         var contactResponse = "";
         $.each(result, function(index){
            contactResponse += "<a href='#' class='w3-bar-item w3-button w3-border' onclick='renderContact(result[index].ContactID)'>" + result[index].contact_name + "</a>";
         });

                document.getElementById("nav-sidebar").innerHTML = contactResponse;

    }});
}
