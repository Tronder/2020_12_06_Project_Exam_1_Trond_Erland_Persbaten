const url = "https://api.spacexdata.com/v4/launches";
const flight = document.querySelector(".flight");
const searchResult = document.querySelector(".searchResult");
const search = document.querySelector("#searchInput");
const searchBtn = document.querySelector(".searchButton");
const flightError = document.querySelector(".flightError");
const successBtn = document.querySelector(".actionSuccess");
const status = document.querySelector(".status");
const loading = document.querySelector(".loading");
const failedBtn = document.querySelector(".actionFailed");

async function spacexFlight(argument){
    try {
        const response = await fetch(url);
        const json = await response.json();
        let j = 0;

        for(let i = 0; i < json.length; i++){
            
            if(json[i].success === argument){
                generateHtml(json[i], argument, flight)
                j++;
                status.innerHTML = `<p>Displaying ${j} results</p>`;
                if(j === 10){
                    break;
                }
            } 
        }
    }
    catch(error){
        console.log(error);
        flightError.style.display = "block";
    }
    finally{
        loading.style.display = "none";
        flight.style.display = "block";
        document.getElementById("display1").scrollIntoView({ behavior: 'smooth', block: 'start' });
        searchResult.style.display = "none";
    }
}

function generateHtml(argument1, argument2, argument3){
    if(argument1.success === argument2 || argument1.flight_number == argument2){
        if(argument1.details !== null){
        argument3.innerHTML += `<div class="item">
        <h2 class="number">Flight number: ${argument1.flight_number}</h2>
        <img src=${argument1.links.patch.small} class="patch" alt="Patch for flight number ${argument1.flight_number}" onerror='this.style.display = "none"'>
        <p class="itemName">Name: ${argument1.name}</p>
        <p class="missionDetails">Mission Details: ${argument1.details}</p>
        <p>External links:</p>
        <a class="youtube" href=${argument1.links.webcast} target="_blank">Watch video</a>
        <a href="${argument1.links.article}" target="_blank">Full article</a>
        `; 
        }else{
            argument3.innerHTML += `<div class="item">
            <h2 class="number">Flight number: ${argument1.flight_number}</h2>
            <img src=${argument1.links.patch.small} class="patch" alt="Patch for flight number ${argument1.flight_number}" onerror='this.style.display = "none"'>
            <p class="itemName">Name: ${argument1.name}</p>
            <p>Mission details is <i>missing</i>, but you can explore the video and article for more info</p>
            <p>External links:</p>
            <a class="youtube" href=${argument1.links.webcast} target="_blank">Watch video</a>
            <a href="${argument1.links.article}" target="_blank">Full article</a>
            `; 
        }
    }

} 


// Legg inn sjekk for at søket kun inneholder tall!!!!!!!!!!!!!!!!!!!!!!!!!?

search.onkeyup = function logValue() {
    const searchValue = event.target.value.trim();
    if(searchValue.length < 4 && searchValue.length > 0){
        searchBtn.classList.remove('disabled');
        searchBtn.disabled = false;
    }else{
        searchBtn.classList.add('disabled');
        searchBtn.disabled = true;
    }

    async function fetchFlight(searchValue){
        try{
            const response = await fetch(url);
            const json = await response.json();
            status.innerHTML = `<p>Displaying 1 results</p>`;

            for(let i = 0; i < json.length; i++){
                if(json[i].flight_number == searchValue){
                    generateHtml(json[i], searchValue, searchResult)
                }else{
                    continue;
                }}
        }
        catch(error){
            console.log(error);
            flightError.style.display = "block";
        }
        finally{
            loading.style.display = "none";
            searchResult.style.display = "block";
            search.value = "";
            searchBtn.classList.add('disabled');
            if(searchResult.innerHTML === ""){
                searchResult.innerHTML = `<p> Flight number does not exist </p>`
                status.innerHTML = `<p>Displaying 0 results</p>`
            }
            document.getElementById("display1").scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    searchBtn.onclick = function(){
        loading.style.display = "block";
        flightError.style.display = "none";
        searchResult.innerHTML = "";
        flight.innerHTML = "";
        fetchFlight(searchValue)
    }
}


successBtn.onclick = function(){
    loading.style.display = "block";
    flight.innerHTML = "";
    spacexFlight(true); 
}

failedBtn.onclick = function(){
    loading.style.display = "block";
    flight.innerHTML = "";
    spacexFlight(false); 
}


