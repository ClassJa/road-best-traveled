

const formSearch = document.querySelector('label')
const APIKey = "f+m7/YyogybRKvTgVDkyYCL5ScgVxx8KL49/DEOPiJE="
const agencyDrop = document.getElementById("agencyDrop");
const searchInput = document.getElementById('search-input');
const fetchButton = document.getElementById('submit-btn')
const typeDrop = document.getElementById('typeDrop')

const agencyUrl = 'https://data.usajobs.gov/api/codelist/agencysubelements';
const searchUrl ='https://data.usajobs.gov/api/search'
const agencyList = [];
const jobType = ['Full-time', 'Part-time', 'Shift Work', 'Intermittent','Job sharing','Multiple'];

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
        
        for (let i = 0; i < agencyList[0].length; i++) {
        const agency = agencyList[0][i]

        const div = document.createElement('option');
       
        div.setAttribute("agencyID", agency.Code)
        div.textContent = agency.Value
       
        agencyDrop.appendChild(div)
        
      }})

      function jobDrop (){
        console.log(jobType)
        for (let i = 0; i < jobType.length; i++) {
          const type = jobType[i]
  
          const div = document.createElement('option');
         
          div.setAttribute("job", i+1)
          div.textContent = type
         
          typeDrop.appendChild(div)
      }}
      jobDrop()
}

function getApi() {
  const keyword = searchInput.input
  console.log(keyword)
  const requestUrl = searchUrl+"&keyword="+keyword
  
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

  fetchButton.addEventListener('click', function(event){
    getApi()
  })



//   blocker, no error messages are being logged even though dev tools icon show errors


