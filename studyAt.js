var map;
var icon = "marker.png";

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 59.3498092, lng: 18.0684758 },
    zoom: 17,
    mapTypeId: "roadmap",
    tilt: 0
    //tilt: 45
  });

  var marker1 = new google.maps.Marker({
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
  });

  var marker3 = new google.maps.Marker({
    position: { lat: 59.34721, lng: 18.070866 },
    map: map,
    title: "Nymble",
    icon: icon
  });
  marker3.addListener("click", function() {
    infowindow3.open(map, marker3);
  });

  
  var marker1String =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<div id="bodyContent">' +
    "<p><b>Stadsbiblioteket</b></p>" +
    "</div>";

  var marker2String =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<div id="bodyContent">' +
    "<p><b>Cha Talk</b></p>" +
    "</div>";

  var marker3String =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<div id="bodyContent">' +
    "<p><b>Nymble</b></p>" +
    "</div>";

  var infowindow = new google.maps.InfoWindow({
    content: marker1String
  });
  var infowindow2 = new google.maps.InfoWindow({
    content: marker2String
  });
  var infowindow3 = new google.maps.InfoWindow({
    content: marker3String
  });

  marker1.setMap(map);
  marker2.setMap(map);
  marker3.setMap(map);

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
