var map, infoWindow;
var icon = "marker.png";

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 59.3498092, lng: 18.0684758 },
    zoom: 15,
    mapTypeId: "roadmap",
    tilt: 0
  });
  infoWindow = new google.maps.InfoWindow();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Enemy spotted.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }


  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  function distFrom(lat1, lng1, lat2, lng2) {
    var earthRadius = 3958.75;
    var dLat = Math.toRadians(lat2-lat1);
    var dLng = Math.toRadians(lng2-lng1);
    var sindLat = Math.sin(dLat / 2);
    var sindLng = Math.sin(dLng / 2);
    var a = Math.pow(sindLat, 2) + Math.pow(sindLng, 2) * Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2));
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var dist = earthRadius * c;
    console.log("distance" + dist);
    return dist;
    }

  function addMarker(location, titel) {
    console.log("location " + location);
    marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: icon,
        title: titel,
    });
    console.log("titel1: " + marker.titel + " " + this.titel);
    marker.addListener("click", function() {
      map.setZoom(16);
      map.setCenter(this.getPosition(location));
      markerClick.open(map, this);
      console.log("titel: " + marker.titel + " " + this.titel);
    });
}

Stadsbiblioteket = new google.maps.LatLng(59.3434, 18.0548, 'aaa');
addMarker(Stadsbiblioteket);
ChaTalk = new google.maps.LatLng(59.34037, 18.057978, '2');
addMarker(ChaTalk);
Nymble = new google.maps.LatLng(59.34721, 18.070866, '3');
addMarker(Nymble);
Kaferang = new google.maps.LatLng(59.32343754999999, 18.06, '4');
addMarker(Kaferang);

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
  });

  var marker3 = new google.maps.Marker({
    position: { lat: 59.34721, lng: 18.070866 },
    map: map,
    title: "Nymble",
    icon: icon
  });
  marker3.addListener("click", function() {
    infowindow3.open(map, marker3);
  });*/



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

