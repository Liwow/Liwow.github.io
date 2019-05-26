var map, infoWindow;
var icon = "marker.png";
var pos;
//var placesList = [Stadsbiblioteket, Nymble, Chatalk, Stadsbiblioteket];

function exampleCode() {
  var db = firebase.firestore();
  db.collection("submissions")
    .get()
    .then(function(querySnapshot) {
      console.log("jajajaj");
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    });
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 59.3498092, lng: 18.0684758 },
    zoom: 15,
    mapTypeId: "roadmap",
    tilt: 0
  });
  infoWindow = new google.maps.InfoWindow();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("Enemy spotted.");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

  function distFrom(lat1, lon1, lat2, lon2) {
    console.log("pos 1: " + lat1 + " " + lon1);
    console.log("pos 2: " + lat2 + " " + lon2);
    var R = 6371; // Radius of the earth in km
    var dLat = ((lat2 - lat1) * Math.PI) / 180; // deg2rad below
    var dLon = ((lon2 - lon1) * Math.PI) / 180;
    var a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        (1 - Math.cos(dLon))) /
        2;
    dist = Math.round(R * 2 * Math.asin(Math.sqrt(a)) * 1000) / 1000;
    console.log("distance : " + dist + " km");
    return dist;
  }

  function addMarker(location, titel) {
    marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: icon,
      title: titel
    });
    marker.addListener("click", function() {
      map.setZoom(16);
      map.setCenter(this.getPosition(location));
      markerClick.open(map, this);

      distFrom(location.lat(), location.lng(), pos.lat, pos.lng);
    });
  }

  /*function loopList(){
  var len = placesList.length;
  for(i= 0; i< len; i++){
    placesList[i] = name;
    var name;
  }
}

function createMarker(id, lat, lng){
  id = new google.maps.LatLng(lat, lng);
  title = toString(id);
  addMarker(id, title)
}

loopList();
createMarker(Stadsbiblioteket, 59.3434, 18.0548);
createMarker(Chatalk, 59.34037, 18.057978);
createMarker(Nymble, 59.34721, 18.070866);
createMarker(Kaferang, 59.32343754999999, 18.06);*/

  Stadsbiblioteket = new google.maps.LatLng(59.3434, 18.0548);
  addMarker(Stadsbiblioteket, "Stadsbiblioteket");
  ChaTalk = new google.maps.LatLng(59.34037, 18.057978);
  addMarker(ChaTalk, "Chatalk");
  Nymble = new google.maps.LatLng(59.34721, 18.070866);
  addMarker(Nymble, "Nymble");
  Kaferang = new google.maps.LatLng(59.32343754999999, 18.06);
  addMarker(Kaferang, "Kaferang");

  var InfoContent =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<div id="bodyContent">' +
    "<p><b>Koppla till onsen card somehow, visa info</b></p>" +
    "</div>";

  var markerClick = new google.maps.InfoWindow({
    content: InfoContent
  });

  /*Nymble.addListener("click", function() {
  map.setZoom(8);
  map.setCenter(marker.getPosition());
  stadsClick.open(map, stadsClick);
});*/

  /*var marker1 = new google.maps.Marker({
    position: { lat: 59.3434, lng: 18.0548 },
    map: map,
    title: "Stadsbiblioteket",
    icon: icon
  });
  marker1.addListener("click", function() {
    infowindow.open(map, marker1);
  });

  var marker2 = new google.maps.Marker({
    position: { lat: 59.34037, lng: 18.057978 },
    map: map,
    title: "Cha Talk",
    icon: icon
  });
  marker2.addListener("click", function() {
    infowindow2.open(map, marker2);
  });*/

  var markerClick = new google.maps.InfoWindow({
    content: InfoContent
  });

  function CenterControl(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement("div");
    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginBottom = "22px";
    controlUI.style.textAlign = "center";
    controlUI.title = "Click to recenter the map";
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement("div");
    controlText.style.color = "rgb(25,25,25)";
    controlText.style.fontFamily = "Roboto,Arial,sans-serif";
    controlText.style.fontSize = "16px";
    controlText.style.lineHeight = "38px";
    controlText.style.paddingLeft = "5px";
    controlText.style.paddingRight = "5px";
    controlText.innerHTML = "My Position";
    controlUI.appendChild(controlText);

    controlDiv.addEventListener("click", function() {
      navigator.geolocation.getCurrentPosition(getPos, showError);
    });
  }

  // Create the DIV to hold the control and call the CenterControl()
  // constructor passing in this DIV.
  var centerControlDiv = document.createElement("div");
  centerControlDiv.setAttribute("id", "myPos");
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

  function getPos(position) {
    map.setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
    map.setZoom(16);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }
}

function showValue(slider) {
  output = document.getElementById(slider.id + "Output");
  output.innerHTML = slider.value; // Display the default slider value
}

function generateLocationPage() {
  console.log("grav");
  fn.pushPage({ id: "cafe1.html", title: "Cafe 1" });
  var db = firebase.firestore();
  db.collection("submissions")
    .where("place", "==", "cafe")
    .get()
    .then(function(querySnapshot) {
      var wrapper = document.getElementById("reviews");
      var reviewButton = document.createElement("button");
      reviewButton.setAttribute("class", "button");
      reviewButton.innerHTML = "Leave a review";

      wrapper.appendChild(reviewButton);

      querySnapshot.forEach(function(doc) {
        console.log(doc.data());
        document.getElementById("location").innerHTML = doc.data().place;

        reviewButton.setAttribute(
          "onclick",
          'reviewExistingLocation("' + doc.data().place + '")'
        );

        var wifiStar = doc.data().wifi;
        var powerStar = doc.data().powerOutlet;
        var soundStar = doc.data().soundLevel;
        var priceStar = doc.data().prices;

        var wifiEmptyStar = 5 - wifiStar;
        var powerEmptyStar = 5 - powerStar;
        var soundEmptyStar = 5 - soundStar;
        var priceEmptyStar = 5 - priceStar;

        var reviewDiv = document.createElement("div");
        reviewDiv.setAttribute("class", "reviewDiv");

        var wifiElement = document.createElement("div");
        wifiElement.setAttribute("id", "wifiStar");
        wifiElement.innerHTML = "WiFi: ";

        for (var i = 0; i < wifiStar; i++) {
          var fullStar = document.createElement("span");
          fullStar.setAttribute("class", "fa fa-star checked");
          wifiElement.appendChild(fullStar);
        }

        for (var i = 0; i < wifiEmptyStar; i++) {
          var emptyStar = document.createElement("span");
          emptyStar.setAttribute("class", "fa fa-star");
          wifiElement.appendChild(emptyStar);
        }

        var powerElement = document.createElement("div");
        powerElement.innerHTML = "Power Outlets: ";

        powerElement.setAttribute("id", "powerStar");
        for (var i = 0; i < powerStar; i++) {
          var fullStar = document.createElement("span");
          fullStar.setAttribute("class", "fa fa-star checked");
          powerElement.appendChild(fullStar);
        }

        for (var i = 0; i < powerEmptyStar; i++) {
          var emptyStar = document.createElement("span");
          emptyStar.setAttribute("class", "fa fa-star");
          powerElement.appendChild(emptyStar);
        }

        var soundElement = document.createElement("div");
        soundElement.innerHTML = "Sound Level: ";

        soundElement.setAttribute("id", "soundStar");
        for (var i = 0; i < soundStar; i++) {
          var fullStar = document.createElement("span");
          fullStar.setAttribute("class", "fa fa-star checked");
          soundElement.appendChild(fullStar);
        }

        for (var i = 0; i < soundEmptyStar; i++) {
          var emptyStar = document.createElement("span");
          emptyStar.setAttribute("class", "fa fa-star");
          soundElement.appendChild(emptyStar);
        }

        var priceElement = document.createElement("div");
        priceElement.innerHTML = "Prices: ";

        priceElement.setAttribute("id", "priceStar");
        for (var i = 0; i < priceStar; i++) {
          var fullStar = document.createElement("span");
          fullStar.setAttribute("class", "fa fa-star checked");
          priceElement.appendChild(fullStar);
        }

        for (var i = 0; i < priceEmptyStar; i++) {
          var emptyStar = document.createElement("span");
          emptyStar.setAttribute("class", "fa fa-star");
          priceElement.appendChild(emptyStar);
        }

        var food = document.createElement("p");
        var general = document.createElement("p");
        food.innerHTML = "<b>Food available: </b>" + doc.data().food;
        general.innerHTML =
          "<b>General impression: </b>" + doc.data().impression;

        reviewDiv.appendChild(wifiElement);
        reviewDiv.appendChild(powerElement);
        reviewDiv.appendChild(soundElement);
        reviewDiv.appendChild(priceElement);
        reviewDiv.appendChild(food);
        reviewDiv.appendChild(general);

        wrapper.appendChild(reviewDiv);
      });
    });
}
