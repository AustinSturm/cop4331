
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
        console.log(result);
        renderContacts();
        loadContent("welcomeUser.html");
        },
        error: function(result){
            loadContent("failLogin.html");
        }

});
}

function renderContacts() {
    api_key = document.cookie.substring(8);
    $.ajax({
        url: "http://35.227.78.91/user/contacts",
        type: 'post',
        data: {
            api_key: api_key
        },
        success: function(result){
         var contactResponse = "";

         contactResponse += "<a href='#' class='w3-bar-item w3-button w3-light-grey w3-big w3-left' onclick='loadContent(\"addContact.html\")'> <b>ADD CONTACT</b> </a>";
         contactResponse += "<a href='#' class='w3-bar-item w3-button w3-light-grey w3-big w3-left' onclick='loadContent(\"welcomeUser.html\")'> <b> SEARCH </b> </a><br>";
         contactResponse += "<div class='w3-bar-item w3-dark-grey w3-center'>Directory</div>";
         
        result.sort(function(a, b) {

        var textA = a.contact_name.toLowerCase();
        var textB = b.contact_name.toLowerCase();

        if (textA < textB) 
            return -1; 
        if (textA > textB)
            return 1;
        return 0; 
        });

         $.each(result, function(index){
            contactResponse += "<a href='#' class='w3-bar-item w3-button w3-border' onclick='renderContact(" + result[index].ContactID + ")'>" + result[index].contact_name + "</a>";
         });

            document.getElementById("nav-sidebar").innerHTML = contactResponse;
         console.log(result);
    }});
}


function renderContact(id) {

    api_key = document.cookie.substring(8);
    $.ajax({
        url: "http://35.227.78.91/contact/get",
        type: 'post',
        data: {
         api_key: api_key,
         ContactID: id
        },
        success: function(result){
         response = `
         <br><br>
         <div class="w3-container contentCenter w3-animate-left" style="max-width: 800px;">
            <form class='w3-padding w3-card-4 w3-light-grey'>
                <h1> Contact Information </h1>
                <label>Name:</label></br>
                <b>${result[0].contact_name}</b></br></br>
                <label>Address:</label></br>
                <b>${result[0].contact_address}</b></br></br>
                <label>City:</label></br>
                <b>${result[0].contact_city}</b></br></br>
                <label>State:</label></br>
                <b>${result[0].contact_state}</b></br></br>
                <label>Zip:</label></br>
                <b>${result[0].contact_zip_code}</b></br></br>
                <label>Home Phone:</label></br>
                <b>${result[0].contact_home_phone}</b></br></br>
                <label>Work Phone:</label></br>
                <b>${result[0].contact_work_phone}</b></br></br>
                <label>Primary Email:</label></br>
                <b>${result[0].contact_primary_email}</b></br></br>
                <label>Secondary Email:</label></br>
                <b>${result[0].contact_secondary_email}</b></br></br>
            </form>
            <button class="w3-button w3-border w3-margin-top w3-red w3-hover-red" type="submit" value="Submit" onclick="deleteContact(` + id + `)">Delete Contact</button> 
         </div>
         `
            document.getElementById("content").innerHTML = response;
    }});
}
// Copy paste of above function except it takes a parameter on request... Used when refreshing during an active session.
function renderContacts_reload() {
    api_key = document.cookie.substring(8);
    $.ajax({
                url: "http://35.227.78.91/user/contacts",
                type: 'post',
                data: {
                        api_key: api_key
                },
                success: function(result){
         var contactResponse = "";
         contactResponse += "<a href='#' class='w3-bar-item w3-button w3-light-grey w3-big w3-left' onclick='loadContent(\"addContact.html\")'> <b>ADD CONTACT</b> </a>";
         contactResponse += "<a href='#' class='w3-bar-item w3-button w3-light-grey w3-big w3-left' onclick='loadContent(\"welcomeUser.html\")'> <b> SEARCH </b></a><br>";
         contactResponse += "<div class='w3-bar-item w3-dark-grey w3-center'>Directory</div>";
         $.each(result, function(index){
            contactResponse += "<a href='#' class='w3-bar-item w3-button w3-border' onclick='renderContact(" + result[index].ContactID + ")'>" + result[index].contact_name + "</a>";
         });

        document.getElementById("nav-sidebar").innerHTML = contactResponse;

    }});
}

function addContact() {

    api_key = document.cookie.substring(8);
    loadContent("addContact.html");
    var name = $("input[name='name']").val();
    var address = $("input[name='address']").val();
    var city = $("input[name='city']").val();
    var state = $("input[name='state']").val();
    var zip = $("input[name='zip']").val();
    var home_p = $("input[name='home_p']").val();
    var work_p = $("input[name='work_p']").val();
    var email = $("input[name='email']").val();
    var s_email = $("input[name='s_email']").val();

    $.ajax({
        url: "http://35.227.78.91/contact/add",
        type: 'post',
        data: {
            api_key : api_key,
            contact_name : name,
            contact_address : address,
            contact_city : city,
            contact_state : state,
            contact_zip_code : zip,
            contact_home_phone : home_p,
            contact_work_phone : work_p,
            contact_primary_email : email,
            contact_secondary_email : s_email
        },
        success: function(result){
            console.log("add success");
            alert(name + " has been added!");
            renderContacts();
            loadContent("welcomeUser.html");
        },
        error: function(result){
            console.log("add fail");
        }

    });
}

function deleteContact(id) {

    api_key = document.cookie.substring(8);

    $.ajax({
        url: "http://35.227.78.91/contact/destroy",
        type: 'post',
        data: {
            api_key : api_key,
            contact_id : id
        },
        success: function(result){
            console.log("deleted contact");
            alert('Contact has been deleted');
            renderContacts();
            loadContent("welcomeUser.html");
        },
        error: function(result){
            console.log("add fail");
        }
    });
}

function searchForContact() {

    var searchterm = $("input[name='searchterm']").val();
    searchterm = searchterm.toLowerCase();

    api_key = document.cookie.substring(8);

    replaceHTML = '';

    $.ajax({
        url: "http://35.227.78.91/user/contacts",
        type: 'post',
        data: {
            api_key: api_key
        },
        success: function(result){
         var contactResponse = "";
         contactResponse += "";
         $.each(result, function(index){

            thisName = result[index].contact_name.toLowerCase();
            console.log(thisName + " VERSUS " + searchterm);

            if (thisName.includes(searchterm) || thisName == searchterm)
            {
                replaceHTML += `<center><a href='#' class='w3-button' onclick='renderContact(` + result[index].ContactID + `)'>` + result[index].contact_name + `</a></center><br>`;
            }
         });

        if (replaceHTML == '') { loadContent("failWelcomeUser.html"); } 
        else 
        { 
            var lastIndex = replaceHTML.lastIndexOf("<br>");
            replaceHTML = replaceHTML.substring(0, lastIndex);

            document.getElementById("contactDetails").innerHTML = replaceHTML; 
        }
    }
    });
}