var database = firebase.database().ref('/');
var body = document.getElementById('body');

var loggedIN = JSON.parse(localStorage.getItem('loggedInUser'))
var heading = document.getElementById('fullName').innerHTML = "Welcome "+ loggedIN.fName.toUpperCase() + " " + loggedIN.lName.toUpperCase();

database.child('Dua').on("child_added", function (snap) {
    var obj = snap.val();
    obj.key = snap.key;

    var duaDiv = document.createElement("DIV")
    duaDiv.setAttribute("class", "card duaDiv");
    duaDiv.setAttribute("id", obj.key);
    duaDiv.setAttribute("style", "width: 60%")
    var div2 = document.createElement("DIV")
    div2.setAttribute("class", "card-body dua")
    var h4 = document.createElement("H4")
    h4.setAttribute("class", "card-title")
    var p = document.createElement("P")
    p.setAttribute("class", "card-text")

    // comment box
    var commentDiv = document.createElement("DIV");
    commentDiv.className = "input-group inputDiv";
    commentDiv.id = "inputDiv";

    var commentInput = document.createElement("INPUT");
    commentInput.type = "text";
    commentInput.className = "form-control inputCmnt";
    commentInput.placeholder = "Comment..";

    var span = document.createElement("SPAN");
    span.className = "input-group-btn";

    var button = document.createElement("BUTTON");
    button.type = "button"
    button.className = "btn btn-secondary cmntBtn";
    var btnText = document.createTextNode("Comment!");
    button.appendChild(btnText);

    button.addEventListener("click", function () {
        var commentOBJ = {
            sender: loggedIN.fName + " " + loggedIN.lName,
            comment: commentInput.value,
            postUID: obj.key
        }
        
        database.child('comment').push(commentOBJ)
    })

    span.appendChild(button)
    commentDiv.appendChild(commentInput)
    commentDiv.appendChild(span)

    // Pray render
    var commentList = document.createElement("DIV");
    
    var textH4 = document.createTextNode("From : " + obj.senderName.toUpperCase())
    var textP = document.createTextNode(obj.pray)
   
    h4.appendChild(textH4)
    p.appendChild(textP)
    div2.appendChild(h4)
    div2.appendChild(p)
    div2.appendChild(commentDiv)
    duaDiv.appendChild(div2)
    duaDiv.appendChild(commentList)
    body.appendChild(duaDiv)

   })
   //comment render
    database.child("comment").on('child_added', function (cmnts) {
    var comment = cmnts.val();
    comment.key = cmnts.key;
    renderComment(comment);
   })

    function renderComment(comment) {
    var mainDiv = document.createElement("DIV");
    var bodyDiv = document.createElement("DIV");
    var dltbtn = document.createElement("BUTTON");
    var dltBtnTxt = document.createTextNode("Remove");
    dltbtn.className = "btn btn-primary dltBtn";
    dltbtn.setAttribute('onclick', "removeComment('"+comment.key+"')");
    dltbtn.appendChild(dltBtnTxt);
    mainDiv.className ="comment";
    mainDiv.id = comment.key;    
    bodyDiv.className ="card-body crdBdy";

    bodyDiv.appendChild(dltbtn);
    mainDiv.appendChild(bodyDiv);

    var commentText = document.createTextNode(comment.sender.toUpperCase()+ " : " + comment.comment);
    bodyDiv.appendChild(commentText)
    var postDiv = document.getElementById(comment.postUID);
    var commentDiv = postDiv.lastElementChild;
    commentDiv.appendChild(mainDiv);
  }

  function removeComment(cmntID){
    document.getElementById(cmntID).remove();
    database.child('comment').child(cmntID).remove();
  }

  function logout(){
      firebase.auth().signOut().then(function() {
  location = "../signin/signin.html"
  localStorage.clear();

})
  }