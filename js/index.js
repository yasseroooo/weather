// today's card 
var today = document.querySelector("#today")
var today_date = document.querySelector("#today-date")
var City_Location = document.querySelector("#location")
var today_degree = document.querySelector("#today-degree")
var today_icon = document.querySelector("#today-icon")
var description = document.querySelector("#today-description")
var humidty = document.querySelector("#humidty")
var wind = document.querySelector("#wind")
var compass = document.querySelector("#compass")
var search = document.querySelector("#searchBar")
var find = document.querySelector("#button-addon2")
var date = ""
var day = ""
var currentCity = "Cairo"

find.addEventListener("click", function () {
    search.value = ""
})



function cityname(currentCity) {
    //API configration >>
    //==========================================
    // 1-instance from XmlHttpRequiest object
    var httpRequest = new XMLHttpRequest();
    var url = `https://api.weatherapi.com/v1/forecast.json?key=5d8946dbe351427cb4c82345230408&q=${currentCity}&days=3&aqi=n
o&alerts=no`
    // 2- stablish connection
    httpRequest.open("GET", url)

    // 3- send Request 
    httpRequest.send()


    // 4- شوف حالة الريكويست 
    var response = [];
    response = "";
    httpRequest.addEventListener("readystatechange", function () {

        if (httpRequest.readyState === 4 && httpRequest.status === 200) {

            response = JSON.parse(httpRequest.responseText);


            // Access the object within the response
            var nestedproperty = response.current.temp_c
            var nestedLocation = response.location.name;
            var nestedImg = response.current.condition.icon;
            var nestedpartly = response.current.condition.text;
            var nestedhumidity = response.current.humidity;
            var nestedwind_kph = response.current.wind_kph;
            var nestedwind_dir = response.current.wind_dir;
            var nestedDate = response.forecast.forecastday[0].date
            date = nestedDate
            // // Return all keys of the nested object
            // var keys = Object.keys(nestedDate);
            var crtoona = ""

            crtoona = `
        <!-- Today's Card -->
                    <div class=" temp-card shadow p-0 col-lg-3 text-bg-secondary">
                    <div class="day-and-date bg-body px-4 pt-3 d-flex justify-content-between  text-bg-light">
                    <p id="today">${day}</p>
                    <p id="today-date">${nestedDate}</p>
                </div>

                <div class="temp-datails ">
                    <p id="location" class="fw-bolder text-center fs-4">${nestedLocation}</p>
                    <div class="d-flex justify-content-around my-4">
                        <div class="pt-3">
                            <h2 id="today-degree" class="d-inline-block">${nestedproperty}</h2>
                            <h2 class="d-inline-block"><sup>o</sup>C</h2>
                        </div>
                        <img src="${nestedImg}" id="today-icon" width="90" />
                    </div>
                    <p id="today-description" class="text-center">${nestedpartly}</p>
                    <div class="details d-flex justify-content-around pb-3">
                        <div>
                            <i class="bi bi-umbrella"></i>
                            <span id="humidty">${nestedhumidity}</span> <span>%</span>
                        </div>

                        <div>
                            <i class="fas fa-wind pl-3 pr-1"></i>
                            <span id="wind">${nestedwind_kph}</span> <span>km/h</span>
                        </div>

                        <div>
                            <i class="bi bi-compass"></i>
                            <span id="compass">${nestedwind_dir}</span>
                        </div>
                    </div>
                </div>
    
                    </div>
                    <!-- second card  -->
                    <div class="temp-card shadow p-0 col-lg-3 text-bg-secondary">
                        <div class="day-and-date bg-body px-4 pt-3 d-flex justify-content-between  text-bg-light">
                            <p class="today">${getDayName(response.forecast.forecastday[1].date)}</p>
                            <p class="today-date">${response.forecast.forecastday[1].date}</p>
                        </div>

                        <div class="temp-datails ">
                            <p class=" location fw-bolder text-center fs-4">${nestedLocation}</p>
                            <div class="d-flex justify-content-around my-4">
                                <div class="pt-3">
                                    <h2 id="" class="today-degree d-inline-block">${response.forecast.forecastday[1].day.avgtemp_c}</h2>
                                    <h2 class="d-inline-block"><sup>o</sup>C</h2>
                                </div>
                                <img src="${response.forecast.forecastday[1].day.condition.icon}" class="" width="90" />
                            </div>
                            <p id="" class="today-description text-center">${response.forecast.forecastday[1].day.condition.text}</p>
                            
                        </div>
                    </div>
                    <!-- third card -->
                    <div class="temp-card shadow p-0 col-lg-3 text-bg-secondary">
                        <div class="day-and-date bg-body px-4 pt-3 d-flex justify-content-between  text-bg-light">
                            <p class="today">${getDayName(response.forecast.forecastday[2].date)}</p>
                            <p class="today-date">${response.forecast.forecastday[2].date}</p>
                        </div>

                        <div class="temp-datails ">
                            <p class=" location fw-bolder text-center fs-4">${nestedLocation}</p>
                            <div class="d-flex justify-content-around my-4">
                                <div class="pt-3">
                                    <h2 id="" class="today-degree d-inline-block">${response.forecast.forecastday[2].day.avgtemp_c}</h2>
                                    <h2 class="d-inline-block"><sup>o</sup>C</h2>
                                </div>
                                <img src="${response.forecast.forecastday[2].day.condition.icon}" class="today-icon" width="90" />
                            </div>
                            <p id="" class="today-description text-center">${response.forecast.forecastday[2].day.condition.text}</p>
                            
                        </div>
                    </div>
                       
        `
            document.querySelector(".cartona").innerHTML = crtoona;


        }
    });
}



// ++++++++++++++++++++++++++functions++++++++++++++++++++
function getDayName(dateString) {
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var date = new Date(dateString);
    var dayIndex = date.getDay();
    var dayName = daysOfWeek[dayIndex];
    return dayName;
}

var inputDate = "2023-08-05"; // Replace with your desired date
var dayName = getDayName(inputDate);
day = dayName;



searchBar.addEventListener("keyup", function () {

    city = searchBar.value
    console.log(city)
    currentCity = city;
    cityname(city)

})

cityname(currentCity)




