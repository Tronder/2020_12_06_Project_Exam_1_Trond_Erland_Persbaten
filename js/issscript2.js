const url1 = "http://api.open-notify.org/iss-now.json";
const mapError = document.querySelector(".mapError");



// Initiate Map - built from the documentation on leafletjs.com and open-notify.org
var mymap = L.map('mapid').setView([59.9, 10.7], 3);
var issLocation = L.circle([0, 0], 3500e2, {color: "#5FF", opacity: 0.5, weight:0.9, fillColor: "#E5E", fillOpacity: 0.2}).addTo(mymap); 

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 5,
    minZoom: 1,
    id: 'tronder/ckhqesmb70s1x19t7z1jsn3vz',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidHJvbmRlciIsImEiOiJja2hxOHEzMXUxaWdhMzhteDY3eGFnd3dzIn0.0EYpTsUtnZCy1rC3A824ag'
}).addTo(mymap); 

// add icon to the map
var ISSIcon = L.icon({
    iconUrl: 'icons/iss.svg',
    iconSize: [30, 90,]
});

var iss = L.marker([0, 0], {icon: ISSIcon}).addTo(mymap);


// Set location of ISS

async function updateIss(){
    try {
        const response = await fetch(url1);
        const json = await response.json();
        let lat = json.iss_position.latitude;
        let lon = json.iss_position.longitude;

        issLocation.setLatLng([lat, lon]);
        iss.setLatLng([lat, lon]);
        mymap.panTo([lat, lon], animate=true);
    }
    catch(error){
        console.log(error);
        mapError.style.display = 'block';
    }
    finally{
        setTimeout(updateIss, 5000);
    }
}

updateIss();





