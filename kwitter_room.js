var firebaseConfig = {
  apiKey: "AIzaSyCWH3Xf8PV-GKyam7_dQ3NrBNO0gc732bM",
  authDomain: "new-kwitter-b127f.firebaseapp.com",
  databaseURL: "https://new-kwitter-b127f-default-rtdb.firebaseio.com",
  projectId: "new-kwitter-b127f",
  storageBucket: "new-kwitter-b127f.appspot.com",
  messagingSenderId: "795624150980",
  appId: "1:795624150980:web:93573c304c0071c43db691",
  measurementId: "G-ZWJ5J94VL9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "kwitter.html";
}