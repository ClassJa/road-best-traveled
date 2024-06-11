

const formSearch = document.querySelector('label')
const APIKey = "f+m7/YyogybRKvTgVDkyYCL5ScgVxx8KL49/DEOPiJE="
const agencyDrop = document.getElementById("agencyDrop");
const searchInput = document.getElementById('search-input');
const fetchButton = document.getElementById('submit-btn')
const typeDrop = document.getElementById('typeDrop')
const contentEl = document.getElementById('content-list')

const agencyUrl = 'https://data.usajobs.gov/api/codelist/agencysubelements';
const searchUrl ='https://data.usajobs.gov/api/search?'
const agencyList = [];
const jobType = ['Full-time', 'Part-time', 'Shift Work', 'Intermittent','Job sharing','Multiple'];
const resultArray = []
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
       
        div.setAttribute("id", agency.ParentCode)
        div.textContent = agency.Value
       
        agencyDrop.appendChild(div)
        
      }})

      function jobDrop (){
        console.log(jobType)
        for (let i = 0; i < jobType.length; i++) {
          const type = jobType[i]
  
          const div = document.createElement('option');
         
          div.setAttribute("id", i+1)
          div.textContent = type
         
          typeDrop.appendChild(div)
      }}
      jobDrop()
}

function getApi() {
  const keyword = searchInput.value
  const agency = agencyDrop
  const agencyOption = agency.options[agency.selectedIndex];
  const agencyOptionId = agencyOption.id;
  const type = typeDrop
  const typeOption = type.options[type.selectedIndex];
  const typeOptionId = typeOption.id;
  console.log(keyword)
  console.log(agencyOptionId);
  console.log(typeOptionId)
  const requestUrl = searchUrl+"&keyword="+keyword+'&Organization='+agencyOptionId
  +"&PositionSchedule="+typeOptionId
  console.log(requestUrl)
  
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
        resultArray.push(data.SearchResult.SearchResultItems);
        console.log(data);
        console.log(resultArray)
      })

      .then(function(data) {
        for (let i = 0; i < 25; i++) {
          const result = resultArray[0][i]
      
          const div = document.createElement('div');
          const h3 =  document.createElement('h3');
          const location = document.createElement('p')
          
          div.setAttribute("id", result)
          h3.textContent = result.MatchedObjectDescriptor.PositionTitle
          location.textContent = result.MatchedObjectDescriptor.PositionLocationDisplay
          location.setAttribute('lat', )

          contentEl.appendChild(div)
          div.appendChild(h3)
          div.appendChild(location)
      }})
    
      }
  
  
   window.addEventListener("load", (event) => {
      getDropDown()

     });

  fetchButton.addEventListener('click', function(event){
    getApi()
  })

//   blocker, no error messages are being logged even though dev tools icon show errors


