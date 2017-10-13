var database = firebase.database().ref('/')
var user = localStorage.getItem('loggedInUser')
var convertToParse = JSON.parse(user)
// console.log(convertToParse);

var heading = document.getElementById('fullName').innerHTML = "Welcome "+ convertToParse.fName.toUpperCase() + " " + convertToParse.lName.toUpperCase();
var fName = document.getElementById('name').innerHTML = "<b>Name:  </b>"+ convertToParse.fName.toUpperCase() + " " + convertToParse.lName.toUpperCase();  
var email = document.getElementById('email').innerHTML = "<b>Email:  </b>"+ convertToParse.email;
var address = document.getElementById('address').innerHTML = "<b>Address:  </b>"+ convertToParse.address
var cellNumber = document.getElementById('cellNumber').innerHTML = "<b>Number:  </b>"+ convertToParse.cellNumber
var gender = document.getElementById('gender').innerHTML = "<b>Gender:  </b>"+ convertToParse.gender
var age = document.getElementById('age').innerHTML = "<b>Age: </b> "+ convertToParse.age

var dua = document.getElementById('dua')
var senderName = document.getElementById('senderName')


function praySubmit() {
    var obj = {
        pray : dua.value,
        senderName: senderName.value
    }
    database.child('Dua').push(obj)
    dua.value = "";
    senderName.value = "";
}
function edit(){
    alert("Work in process");
}
function logout(){
    firebase.auth().signOut().then(function() {
location = "../signin/signin.html"
localStorage.clear();

})
}