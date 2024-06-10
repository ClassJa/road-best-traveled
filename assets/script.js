
let keyword = prompt("Enter your desired agency")
const formSearch = document.querySelector('label')
const APIKey = "f+m7/YyogybRKvTgVDkyYCL5ScgVxx8KL49/DEOPiJE="
const agencyDrop = document.getElementById("agencyDrop");
const searchInput = document.getElementById('search-input');
const fetchButton = document.getElementById('button')

const agencyUrl = 'https://data.usajobs.gov/api/codelist/agencysubelements';
const agencyList = [];

//keyword.toLowerCase

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

    .then((data) => {
        console.log(data);
        agencyList.push(data.CodeList[0].ValidValue)
        console.log(agencyList)
        return(agencyList)
      })

      .then(function (data) {
        
        for (let i = 0; i < agencyList.length; i++) {
        const agency = agencyList[i]

        const div = document.createElement('option');
       
        div.setAttribute("agencyID", agency[i].Code)
        div.textContent = agency[i].Value
       
        agencyDrop.appendChild(div)
        
      }})
}

function getApi() {
    const requestUrl = `https://developer.usajobs.gov/codelist/agencysubelements/Search?Keyword=${keyword}`

  
    fetch(requestUrl, {

        method: "GET",
        headers: {                  
            "Authorization-Key": APIKey      
        }}
    )
    
      .then(function (response) {
        if (!response.ok) {
            console.log("Error")
            throw new Error(`HTTP error! Status: ${Response.status}`);
        }
        console.log("Response Okay")
        return response.json();

      })

      .then((data) => {
        console.log(data);
      })

        return data
    
      }
  
  
   window.addEventListener("load", (event) => {
      getDropDown()
     });

  formSearch.addEventListener('click', getApi)



//   blocker, no error messages are being logged even though dev tools icon show errors


