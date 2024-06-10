const APIKey = "f+m7/YyogybRKvTgVDkyYCL5ScgVxx8KL49/DEOPiJE="
const agencyDrop = document.getElementById("agencyDrop");
const searchInput = document.getElementById('search-input');
// const fetchButton = document.getElementB('button')

const agencyUrl = 'https://data.usajobs.gov/api/codelist/agencysubelements';
const agencyList = [];

function getDropDown() {

  fetch(agencyUrl, {
        method: "GET",
        headers: {                  
            "Authorization-Key": APIKey      
        }}
    )
    
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        console.log(data);
        agencyList.push(data.CodeList[0].ValidValue)
        console.log(agencyList)
        return(agencyList)
      })

      .then(function (data) {
        agencyDrop.innerHTML = '';
        
        for (let i = 0; i < agencyList.length; i++) {
        const agency = agencyList[i]

        const div = document.createElement('option');
       
        div.setAttribute("agencyID", agency[i].Code)
        div.textContent =  agency[i].Value
       
        agencyDrop.appendChild(div)
        
      }})


   
     }
     window.addEventListener("load", (event) => {
      getDropDown()
     });