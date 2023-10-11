
//ADD YOUR FIREBASE LINKS
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAaGvUt160C_Vl2R06tE9UfnvzSJVy4O3I",
  authDomain: "c93kwitter-ef219.firebaseapp.com",
  databaseURL: "https://c93kwitter-ef219-default-rtdb.firebaseio.com",
  projectId: "c93kwitter-ef219",
  storageBucket: "c93kwitter-ef219.appspot.com",
  messagingSenderId: "35667598944",
  appId: "1:35667598944:web:5bf841e38214539bf9ed05"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// part 1 C102
user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";
//*****************************************************/

// part 2 C102
// when “Add Room" Button is clicked it will add the room name in the firebase and in the localStorage
function addRoom() {
  room_name = document.getElementById("room_name").value; //pick value from input box

  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });   //save value to firebase

  localStorage.setItem("room_name", room_name); //save value to local storage

  window.location = "kwitter_page.html"; // navigate 

}
// ********************************************************

//part 3 C102 
// function gets all the room names from firebase and display
function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey; //Room_names variable holds all the room names coming from the firebase
      
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" 
      + Room_names + "</div><hr>";
      //if Room_Names="LetsKweet"
      //<div class="room_name" id="LetsKweet" onclick="redirectToRoomName(LetsKweet)">#LetsKweet</div><hr>
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

//part 4 C102 redirect to kwitter_page.html - in the room name which the user clicks 
function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}
//************************************* */

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
