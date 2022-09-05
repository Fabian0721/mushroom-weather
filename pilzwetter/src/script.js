// Global variables for usage //
var city;
var lat = 0;
var lon = 0;
var rain = 0;

// Replacement until the final function //
function dateProd() {
    
    //const heute = new Date();
    //document.getElementById("month").innerHTML = heute.getMonth();
    //document.getElementById("year").innerHTML = heute.getFullYear();
    //document.getElementById("day").innerHTML = heute.getDate();
    
    const datum = ['2022-08-24', '2022-08-25', '2022-08-26', '2022-08-27', '2022-08-28', '2022-08-29', '2022-08-30', '2022-08-31', '2022-09-01', '2022-09-03'];
    
    return datum;
}

/*
// Basic Testing 
function changeDisplay() {
            document.getElementById("Demo").innerHTML = "Sie sind Angemeldet";
        }

function changeDisplayBack() {
            document.getElementById("Demo").innerHTML = "Willkommen die App ist bald verfügbar";
        }
*/

// Pause the program execution so that the results can arrive from the server. //
function Sleep(milliseconds) {
 return new Promise(resolve => setTimeout(resolve, milliseconds));
}


// Doing forward Geocoding //
function forwardGeocoding(city) {
    
    // Variables for usage //
    var GeocodingData;
    
    // API KEY from https://opencagedata.com/dashboard#geocoding //
    var api_key = '4643222a5070454f90d1f4f080b0f490';
    
    // Doing an API request for the given city inkl. URL encoding //
    var requestURL = 'https://api.opencagedata.com/geocode/v1/json?'
            +'q=' + encodeURIComponent(city) 
            +'&key=' + api_key;
    
    var request = new XMLHttpRequest();
    
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    
    // Do this when the server answers //
    request.onload = function() {
        
    GeocodingData = request.response;
        
    // Extract the latitude and longitude from the JSON file //
    lat = GeocodingData['results'][0]['geometry']['lat'];
    lon = GeocodingData['results'][0]['geometry']['lng'];
           
    }
}


async function cityInput() {
    
    document.getElementById("score").innerHTML = "... nur noch wenige Sekunden ...";
    document.getElementById("score").style.color = "#D3D3D3";
    
    // Getting the Name of the City // 
    city = "Fehler";
    rain = 0;
    city = document.getElementById("stadt").value;
    document.getElementById("headline").innerHTML = "Das Pilzwetter in " + city;
    
    // Doing forward Geocoding //
    forwardGeocoding(city);
    
    // Pause the program execution so that the results can arrive from the server. //
    await Sleep(1000); 
    
    // Test // 
    //document.getElementById("latitude").innerHTML = lat
    //document.getElementById("longitude").innerHTML = lon
   
    //--//--//--//--//--//--//
    //Test der JSON DWD API //
    //--//--//--//--//--//--//
    
    /*
    var requestURL = 'https://api.brightsky.dev/weather?lat='+ lat + '&lon=' + lon + '&date=2022-09-03';
    
    var request = new XMLHttpRequest();
    
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    
    request.onload = function() {
        
    var WeatherData = request.response;
    
    for (let counter = 0; counter < 24; counter++) {
    // Runs 24 times, with values of counter 0 through 23.
        rain = rain + WeatherData['weather'][counter]['precipitation'];
    }   
    document.getElementById("rain").innerHTML = rain + " l/m<sup>2</sup> Niederschlag ( 10 Tage )";     
        
    document.getElementById("Demo").innerHTML = WeatherData['weather'][1]['precipitation'];   
    
    }
    */
}


async function dwdData(datum) {
    
    for (let counter = 0; counter < 10; counter++) {
    
        await Sleep(250);
        var rainDay = 0;
        
        var requestURL = 'https://api.brightsky.dev/weather?lat='+ lat + '&lon=' + lon + '&date=' + datum[counter];
    
        var request = new XMLHttpRequest();
    
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
    
        request.onload = function() {
        
        var WeatherData = request.response;
    
        for (let count = 0; count < 24; count++) {
        // Runs 24 times, with values of counter 0 through 23.
            rainDay = rainDay + WeatherData['weather'][count]['precipitation'];
        }
        rain = rain + rainDay;
        document.getElementById("rain").innerHTML = Math.round(rain) + " l/m<sup>2</sup> Niederschlag ( 10 Tage )"; 
        }
        
    } 

  /*  
    //Test der JSON DWD API //
    var requestURL = 'https://api.brightsky.dev/weather?lat='+ lat + '&lon=' + lon + '&date=' + datum[9];
    
    var request = new XMLHttpRequest();
    
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    
    request.onload = function() {
        
    var WeatherData = request.response;
    
    for (let counter = 0; counter < 24; counter++) {
    // Runs 24 times, with values of counter 0 through 23.
        rain = rain + WeatherData['weather'][counter]['precipitation'];
    }  
        
        
    document.getElementById("rain").innerHTML = rain + " l/m<sup>2</sup> Niederschlag ( 10 Tage )";     
        
    //document.getElementById("Demo").innerHTML = WeatherData['weather'][1]['precipitation'];   
    }
*/
}
  



async function display() {
    
    var datum = dateProd();
    //document.getElementById("year").innerHTML = datum[9];
    
    cityInput();
    
    await Sleep(1000); 
    
    dwdData(datum);
    
    await Sleep(5000);
    
    if (rain < 20) {
        document.getElementById("score").innerHTML = "Schlecht";
        document.getElementById("score").style.color = "red";
    }
    if (rain >= 20) {
        document.getElementById("score").innerHTML = "Ok";
        document.getElementById("score").style.color = "yellow";
    }
    if (rain >= 50) {
        document.getElementById("score").innerHTML = "Gut";
        document.getElementById("score").style.color = "green";
    }
   
}






