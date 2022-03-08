var submitbtn=$('#submitbtn');
var locationbtn=$('#Locationbtn');

locationbtn.click(GetLocation);
submitbtn.click(getAddress);

function GetLocation(){
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
	map = new google.maps.Map(document.getElementById("map"),{
	  zoom: 8,
	  center: { lat: 40.731, lng: -73.997 },
	});

	$('#shareform').css("display","none");
	$('#requestSearch').css("display","block");
	$('#formback').css("display","block");
	$('#map').css("display","block");
}

function getRequests()
{
	var s=$('#requestlocationfield').val();
	$('#requestlocationfield').val("");
	console.log(s);
}

function SetCoords(position){
	latlng = {
		lat: parseFloat(position.coords.latitude),
		lng: parseFloat(position.coords.longitude),
	};

	const geocoder = new google.maps.Geocoder();
	const infowindow = new google.maps.InfoWindow();
	
	
	geocodeLatLng(geocoder, map, infowindow,latlng);
}


function geocodeLatLng(geocoder, map, infowindow) {
	geocoder
	  .geocode({ location: latlng })
	  .then((response) => {
		if (response.results[0]) {
		//   map.setZoom(11);
  
		//   const marker = new google.maps.Marker({
		// 	position: latlng,
		// 	map: map,
		//   });
			var addressarr=response.results[0].formatted_address.split(",");
			var street_add="";
			for(var i=0;i<addressarr.length-3;i++)
			{
				street_add+=addressarr[i];
				street_add+=",";
			}
			$('#addressfield1').val(street_add);
			$('#addressfield2').val(addressarr[addressarr.length-3]);
			var state_pin=addressarr[addressarr.length-2].split(" ");
			$('#pincode').val(state_pin[2]);
			$('#statefield').val(state_pin[1]);
			$('#countryfield').val(addressarr[addressarr.length-1]);
		//   infowindow.open(map, marker);
			
		} else {
		  window.alert("No results found");
		}
	  })
	  .catch((e) => window.alert("Geocoder failed due to: " + e));
}

function getAddress(){
	var ad1=document.getElementById('addressfield1').value;
	var ad2=document.getElementById('addressfield2').value;
	var pincode=document.getElementById('pincode').value;
	var state=document.getElementById('statefield').value;
	var country=document.getElementById('countryfield').value;
	if(pincode!=="")
	{
		address=ad1+","+ad2+"-"+pincode;
	}
	else
	{
		address=ad1+","+ad2+","+state+","+country;
	}
	geocodeAddress(address);
}

function postdata(place_id,Lat,Lng){
	var http=new XMLHttpRequest();
	
	var Name=$('#namefield').val();
	var UserID=$('#idfield').val();
	var email=$('#emailfield').val();

	http.open('POST',"https://gdsc-hungerfreeapi.uc.r.appspot.com/donation/",true);  
	
	var postadd=JSON.stringify({
		"Name": Name,
		"UserID": UserID,
		"Email":email,
		"Place_id":place_id,
		"Lat":Lat,
		"Lng":Lng
	});

	http.send(postadd);

	http.onreadystatechange=function(){
		if(http.readyState===4)
		{
			if(http.status===200)
			{
				alert("Donation Created Successfully");
			}
			else if(http.status===500)
			{
				alert("Incorrect Data");
			}
			else
			{
				alert("code not found");
			}
		}
	}
}

function geocodeAddress(address){
	const geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == 'OK') {
			// map.setCenter(results[0].geometry.location);
			postdata(results[0].place_id,results[0].geometry.location.lat(),results[0].geometry.location.lng());
			// var marker = new google.maps.Marker({
			// map: map,
			// position: results[0].geometry.location
		// });
		} 
		else {
			alert('Please Enter A Valid Address');
		}
	});
}