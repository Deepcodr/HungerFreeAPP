document.getElementById('requestbtn').onclick=getRequests;
document.getElementById('donationbtn').onclick=getDonations;
document.getElementById('userhistorybtn').onclick=getUserhistory;
document.getElementById('userhistoryclearbtn').onclick=clearUserHistory;

var responsedata;

function clearUserHistory(){
    var uid=JSON.parse(document.getElementById("user_id").textContent);

    var http =new XMLHttpRequest();

    var url="https://gdsc-hungerfreeapi.uc.r.appspot.com/userdata/"+"?uid="+encodeURIComponent(uid);
    http.open('DELETE',url,true);
    http.send();

    http.onreadystatechange=function(){
        if(http.readyState===4)
        {
            if(http.status===200)
            {
                alert(http.responseText);
            }
            else
            {
                alert(http.responseText);
            }
        }
    }
    
    getUserhistory();
}

function getRequests(){
    if(document.getElementById('userhistoryclearbtn').style.display==="block")
    {
        document.getElementById('userhistoryclearbtn').style.display="none";
    }
    document.getElementById('userdatatable').style.display="block";
    document.getElementById('tablebodyfield').innerHTML='';
    document.getElementById('userhistorylist').style.display="none";
    var http=new XMLHttpRequest();

    var uid=JSON.parse(document.getElementById("user_id").textContent);

    var url="https://gdsc-hungerfreeapi.uc.r.appspot.com/userdata/"+"?uid="+encodeURIComponent(uid)+"&get="+encodeURIComponent('101');
    http.open('GET',url,true);
    http.send();
    
    http.onreadystatechange=function(){
        if(http.readyState===4)
        {
            if(http.status===200)
            {
                if(JSON.parse(http.response)==="no data found")
                {
                    alert("no request data found");
                }
                else
                {
                    responsedata=JSON.parse(http.response);
                    createRow(JSON.parse(http.response));
                }
            }
            else
            {
                alert("failed to get data");
            }
        }
    }    
}

function getDonations(){
    if(document.getElementById('userhistoryclearbtn').style.display==="block")
    {
        document.getElementById('userhistoryclearbtn').style.display="none";
    }
    document.getElementById('tablebodyfield').innerHTML='';
    document.getElementById('userdatatable').style.display="block";
    document.getElementById('userhistorylist').style.display="none";
    var http=new XMLHttpRequest();

    var uid=JSON.parse(document.getElementById("user_id").textContent);

    var url="https://gdsc-hungerfreeapi.uc.r.appspot.com/userdata/"+"?uid="+encodeURIComponent(uid)+"&get="+encodeURIComponent('102');
    http.open('GET',url,true);
    http.send();
    
    http.onreadystatechange=function(){
        if(http.readyState===4)
        {
            if(http.status===200)
            {
                if(JSON.parse(http.response)==="no data found")
                {
                    alert("no request data found");
                }
                else
                {
                    createRow(JSON.parse(http.response));
                }
            }
            else
            {
                alert("failed to get data");
            }
        }
    } 
}

function getUserhistory(){
    document.getElementById('userhistoryclearbtn').style.display="block";
    document.getElementById('userhistorylist').style.display="block";
    document.getElementById('userhistory').innerHTML='';
    var http1=new XMLHttpRequest();

    var uid=JSON.parse(document.getElementById("user_id").textContent);

    var url="https://gdsc-hungerfreeapi.uc.r.appspot.com/userdata/"+"?uid="+encodeURIComponent(uid)+"&get="+encodeURIComponent('103');
    http1.open('GET',url,true);
    http1.send();
    
    http1.onreadystatechange=function(){
        if(http1.readyState===4)
        {
            if(http1.status===200)
            {
                if(JSON.parse(http1.response)==="no data found")
                {
                    alert("no request data found");
                }
                else
                {
                    createHistory(JSON.parse(http1.response))
                }
            }
            else
            {
                alert("failed to get data");
            }
        }
    }
    
    var http2=new XMLHttpRequest();

    var url="https://gdsc-hungerfreeapi.uc.r.appspot.com/userdata/"+"?uid="+encodeURIComponent(uid)+"&get="+encodeURIComponent('104');
    http2.open('GET',url,true);
    http2.send();
    
    http2.onreadystatechange=function(){
        if(http2.readyState===4)
        {
            if(http2.status===200)
            {
                if(JSON.parse(http2.response)==="no data found")
                {
                    alert("no request data found");
                }
                else
                {
                    createHistory(JSON.parse(http2.response))
                }
            }
            else
            {
                alert("failed to get data");
            }
        }
    }

    var http3=new XMLHttpRequest();

    var url="https://gdsc-hungerfreeapi.uc.r.appspot.com/userdata/"+"?uid="+encodeURIComponent(uid)+"&get="+encodeURIComponent('105');
    http3.open('GET',url,true);
    http3.send();
    
    http3.onreadystatechange=function(){
        if(http3.readyState===4)
        {
            if(http3.status===200)
            {
                if(JSON.parse(http3.response)==="no data found")
                {
                    alert("no request data found");
                }
                else
                {
                    createHistory(JSON.parse(http3.response))
                }
            }
            else
            {
                alert("failed to get data");
            }
        }
    }
}

function createRow(requestdata){
    var index=0;
    for(var i=0;i<requestdata.length;i++)
    {
        var data=requestdata[i];
        latlng = {
            lat: parseFloat(data.Lat),
            lng: parseFloat(data.Lng),
        };
        
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({location:latlng},function(results,status){
            if (status == 'OK') {
                showrow(results[0].formatted_address,index);
                index++;
            }
            else {
                alert('Cannot get data');
            }
        });
    }
}

function showrow(placeaddress,index){
    var place=document.createTextNode(placeaddress);
    var trow=document.createElement('tr');
    var tindex=document.createElement('td');
    var tplace=document.createElement('td');
    var ind=document.createTextNode(index+1);
    tindex.appendChild(ind);
    tplace.appendChild(place);
    trow.appendChild(tindex);
    trow.appendChild(tplace);
    document.getElementById('tablebodyfield').appendChild(trow);
}

function createHistory(requestdata){
    var index=0;
    document.getElementById('userdatatable').style.display="none";
    var uid=JSON.parse(document.getElementById('user_id').textContent);

    for(var i=0;i<requestdata.length;i++)
    {
        index++;
        data=requestdata[i];
        if(data.Type='R')
        {
            if(data.create_uid===uid)
            {
                var line=document.createElement('li');
                var textdata=document.createTextNode("Your Request has been accepted by "+data.accept_uid);
                line.appendChild(textdata);
                line.classList.add('alert','alert-success');
                // geocodeAddress(data.Place_id);
                // var pad=localStorage.getItem("placeaddress");
                // var place=document.createTextNode(pad);
                document.getElementById('userhistory').appendChild(line);
            }
            else
            {
                var line=document.createElement('li');
                var textdata=document.createTextNode("You accepted request by "+data.create_uid);
                line.appendChild(textdata);
                line.classList.add('alert','alert-success');
                // geocodeAddress(data.Place_id);
                // var pad=localStorage.getItem("placeaddress");
                // var place=document.createTextNode(pad);
                document.getElementById('userhistory').appendChild(line);
            }
        }
        else if(data.Type='D')
        {
            if(data.create_uid===uid)
            {
                var line=document.createElement('li');
                var textdata=document.createTextNode("Your donation has been accepted by "+data.accept_uid);
                line.appendChild(textdata);
                line.classList.add('alert','alert-success');
                // geocodeAddress(data.Place_id);
                // var pad=localStorage.getItem("placeaddress");
                // var place=document.createTextNode(pad);
                document.getElementById('userhistory').appendChild(line);
            }
            else
            {
                var line=document.createElement('li');
                var textdata=document.createTextNode("You accepted donation by "+data.create_uid);
                line.appendChild(textdata);
                line.classList.add('alert','alert-success');
                // geocodeAddress(data.Place_id);
                // var pad=localStorage.getItem("placeaddress");
                // var place=document.createTextNode(pad);
                document.getElementById('userhistory').appendChild(line);
            }
        }
    }
}