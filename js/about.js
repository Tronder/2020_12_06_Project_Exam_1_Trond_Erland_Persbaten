const spaceXURL = "https://api.spacexdata.com/v4/company";
const spacex = document.querySelector(".spacex");
const hq = document.querySelector(".hq");
const people = document.querySelector(".people");
const links = document.querySelector(".links");
const aboutError = document.querySelector(".aboutError");



async function spaceXInfo(){
    try{
        const response = await fetch(spaceXURL);
        const json = await response.json();
        const jsonHq = json.headquarters;
        const jsonLinks = json.links;

        spacex.innerHTML = `
        <p>Year SpaceX was Founded: ${json.founded}.</p>
        <p>Founder: ${json.founder}.</p>
        <p>Valuation: $${json.valuation}.</p>
        <p>Number of Launch sites: ${json.launch_sites}.</p>
        <p>Number of test sites: ${json.test_sites}.</p>
        <p>About SpaceX: ${json.summary}.</p>
        `;

        people.innerHTML = `
        <p>CEO: ${json.ceo}.</p>
        <p>COO: ${json.coo}.</p>
        <p>CTO: ${json.cto}.</p>
        <p>CTO Propulsion: ${json.cto_propulsion}.</p>
        <p>Number of Employees: ${json.employees}.</p>
        `;

        hq.innerHTML = `
        <h2>SpaceX Headquarters</h2>
        <p>Address: ${jsonHq.address}</p>
        <p>City: ${jsonHq.city}</p>
        <p>State: ${jsonHq.state}</p>
        `;

        links.innerHTML = `
        <h3> Usefull links for more information and updates</h3>
        <a href=${jsonLinks.elon_twitter} class="sLink" target="_blank">Elon Musk twitter feed</a>
        <a href=${jsonLinks.flickr} class="sLink" target="_blank">SpaceX Photos on Flickr</a>
        <a href=${jsonLinks.twitter} class="sLink" target="_blank">SpaceX Twitter feed</a>
        <a href=${jsonLinks.website} class="sLink" target="_blank">SpaceX Official website</a>        
        `;

        
    }
    catch(error){
        console.log(error);
        aboutError.style.display = "block";
    }
}

spaceXInfo();