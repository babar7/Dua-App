var database = firebase.database().ref("/");

var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var email = document.getElementById("email");
var password = document.getElementById("password");
var address = document.getElementById("inputAddress");
var cellNumber = document.getElementById("cellNumber");
var gender = document.getElementById("gender");
var age = document.getElementById("age");

function signup(){
    var usersData = {
        fName : firstName.value,
        lName : lastName.value,
        email : email.value,
        pass : password.value,
        address : address.value,
        cellNumber : cellNumber.value,
        gender : gender.value,
        age : age.value
    }
firebase.auth().createUserWithEmailAndPassword(usersData.email, usersData.pass)
.then(function (res){
    // console.log(res);
    database.child("usersData/" + res.uid).set(usersData).then(function(){
        location = 'signin/signin.html';
    })

})
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});

}
