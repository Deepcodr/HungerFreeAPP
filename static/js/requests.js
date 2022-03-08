$('#requestsbtn').click(initMap);

function GetLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(SetCoords);
	}
	else {
		console.log("Geolocation is not supported by this browser.");
	}
}

var latlng;
var map;
var address;

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		zoom: 8,
		center: { lat: 40.731, lng: -73.997 },
	});
}

function getRequests() {
	var s = $('#requestlocationfield').val();
	geocodeAddress(s);
}

function AcceptRequest(markerobject){
	var uid=prompt("Enter Your UserID to confirm");
	if(uid!==null && uid!=="" && uid===JSON.parse(document.getElementById('user_id').textContent))
	{
		var http=new XMLHttpRequest();
	
		delLat=parseFloat(markerobject.latLng.lat());
		delLng=parseFloat(markerobject.latLng.lng());
	
		var url = "https://gdsc-hungerfreeapi.uc.r.appspot.com/request/"+"?delLat="+encodeURIComponent(delLat)+"&delLng="+encodeURIComponent(delLng)+"&uid="+encodeURIComponent(uid);
		http.open('DELETE', url, true);

		http.send();
	
		http.onreadystatechange = function () {
			if (http.readyState === 4) {
				if (http.status === 200) {
					alert(http.responseText);
				}
				else {
					alert("Error");
				}
			}
		}
	}
	else if(uid==="" || uid!==JSON.parse(document.getElementById('user_id').textContent))
	{
		alert("Invalid UserID");
	}
}

function showrequests(data) {
	var requests_data = JSON.parse(data);

	if(requests_data.length===0)
	{
		return;
	}
	initMap();
	latlng = {
		lat: parseFloat(requests_data[0].Lat),
		lng: parseFloat(requests_data[0].Lng),
	};
	map.setCenter(latlng);
	for (let index = 0; index < requests_data.length; index++) {
		const request = requests_data[index];
		latlng = {
			lat: parseFloat(request.Lat),
			lng: parseFloat(request.Lng),
		};
		map.setZoom(12);
		const marker = new google.maps.Marker({
			position: latlng,
			map: map,
			// icon: {
			// 	url: 'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png'
			// },
		});
		const infowindow = new google.maps.InfoWindow();
		infowindow.setContent(request.Email);
		infowindow.open(map, marker);
		marker.addListener("click", AcceptRequest.bind(marker));

	}
}

function SetCoords(position) {
	latlng = {
		lat: parseFloat(position.coords.latitude),
		lng: parseFloat(position.coords.longitude),
	};

	console.log(latlng);
	const geocoder = new google.maps.Geocoder();
	const infowindow = new google.maps.InfoWindow();
	

	geocodeLatLng(geocoder, map, infowindow, latlng);
}


function geocodeLatLng(geocoder) {
	geocoder
	.geocode({ location: latlng })
		.then((response) => {
			if (response.results[0]) {
				$('#requestlocationfield').val(response.results[0].formatted_address);
			} else {
				window.alert("No results found");
			}
		})
		.catch((e) => window.alert("Geocoder failed due to: " + e));
	}

function getMarkers(Lat, Lng) {
	var http = new XMLHttpRequest();
	
	var url = "https://gdsc-hungerfreeapi.uc.r.appspot.com/donation/" + "?lat=" + encodeURIComponent(Lat) + "&lng=" + encodeURIComponent(Lng);
	http.open('GET', url, true);

	http.send();

	http.onreadystatechange = function () {
		if (http.readyState === 4) {
			if (http.status === 200) {
				if(JSON.parse(http.response)==="No requests found for this location")
				{
					alert(http.responseText);
					initMap();
				}
				else
				{
					showrequests(http.response);
				}
			}
			else if (http.status === 500) {
				alert("Incorrect Data");
			}
			else {
				alert("Error");
			}
		}
	}
}

function geocodeAddress(address) {
	const geocoder = new google.maps.Geocoder();
	geocoder.geocode({ 'address': address }, function (results, status) {
		if (status == 'OK') {
			getMarkers(results[0].geometry.location.lat(), results[0].geometry.location.lng());
		}
		else {
			alert('Please Enter A Valid Address');
		}
	});
}