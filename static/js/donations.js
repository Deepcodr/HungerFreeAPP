$('#contributionsbtn').click(initMap);

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

function getDonations() {
	var s = $('#donationlocationfield').val();
	geocodeAddress(s);
}

function AcceptDonation(markerobject){
	var uid=prompt("Enter Your UserID to confirm");
	if(uid!==null && uid!=="" && uid===JSON.parse(document.getElementById('user_id').textContent))
	{
		var http=new XMLHttpRequest();
	
		delLat=parseFloat(markerobject.latLng.lat());
		delLng=parseFloat(markerobject.latLng.lng());
	
		var url = "https://gdsc-hungerfreeapi.uc.r.appspot.com/donation/"+"?delLat="+encodeURIComponent(delLat)+"&delLng="+encodeURIComponent(delLng)+"&uid="+encodeURIComponent(uid);
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

function showdonations(data) {
	var donations_data = JSON.parse(data);

	if(donations_data.length===0)
	{
		return;
	}
	initMap();
	latlng = {
		lat: parseFloat(donations_data[0].Lat),
		lng: parseFloat(donations_data[0].Lng),
	};
	map.setCenter(latlng);
	for (let index = 0; index < donations_data.length; index++) {
		const donation = donations_data[index];
		latlng = {
			lat: parseFloat(donation.Lat),
			lng: parseFloat(donation.Lng),
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
		infowindow.setContent(donation.Email);
		infowindow.open(map, marker);
		marker.addListener("click", AcceptDonation.bind(marker));
		//   infowindow.setContent(response.results[0].formatted_address);
		//   infowindow.open(map, marker);
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
				$('#donationlocationfield').val(response.results[0].formatted_address);
			} else {
				window.alert("No results found");
			}
		})
		.catch((e) => window.alert("Geocoder failed due to: " + e));
}

function getMarkers(Lat, Lng) {
	var http = new XMLHttpRequest();

	var url = "https://gdsc-hungerfreeapi.uc.r.appspot.com/request/" + "?lat=" + encodeURIComponent(Lat) + "&lng=" + encodeURIComponent(Lng);
	http.open('GET', url, true);

	http.send();

	http.onreadystatechange = function () {
		if (http.readyState === 4) {
			if (http.status === 200) {					
				if(JSON.parse(http.response)==="No donations found for this location")
				{
					alert(http.responseText);
					initMap();
				}
				else
				{
					showdonations(http.response);
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