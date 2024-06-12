

const formSearch = document.querySelector('label')
const APIKey = "f+m7/YyogybRKvTgVDkyYCL5ScgVxx8KL49/DEOPiJE="
const agencyDrop = document.getElementById("agencyDrop");
const searchInput = document.getElementById('search-input');
const fetchButton = document.getElementById('submit-btn')
const prevButton = document.getElementById('prev-btn')
const typeDrop = document.getElementById('typeDrop')
const contentEl = document.getElementById('content-list')

const agencyUrl = 'https://data.usajobs.gov/api/codelist/agencysubelements';
const searchUrl ='https://data.usajobs.gov/api/search?'
const agencyList = [];
const jobType = ['Full-time', 'Part-time', 'Shift Work', 'Intermittent','Job sharing','Multiple'];
const resultArray = []
const previousArray = []
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
       
        div.setAttribute("id", agency.Code)
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
  
  const prevKeys = {
    keyword: keyword,
    agencyOptionId: agencyOptionId,
    typeOptionId: typeOptionId,
  }

  previousArray.push(prevKeys)

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
        resultArray.length = 0
        resultArray.unshift(data.SearchResult.SearchResultItems);
        console.log(data);
        console.log(resultArray)
      })

      .then(function(data) {
        contentEl.innerhtml='';
        for (let i = 0; i < resultArray[0].length; i++) {
          const result = resultArray[0][i]
      
          const div = document.createElement('div');
          const h3 =  document.createElement('h3');
          const location = document.createElement('p');
          
          div.setAttribute("id", result.MatchedObjectId)
          h3.textContent = result.MatchedObjectDescriptor.PositionTitle
          location.textContent = result.MatchedObjectDescriptor.PositionLocationDisplay
          location.setAttribute('lat', result.MatchedObjectDescriptor.PositionLocation[0].Latitude)
          location.setAttribute('lon', result.MatchedObjectDescriptor.PositionLocation[0].Longitude)
        
          contentEl.appendChild(div)
          div.appendChild(h3)
          div.appendChild(location)
      }})
    
      }
  
      function jobCard (data) {
        contentEl.innerhtml='';
        for (let i = 0; i < resultArray[0].length; i++) {
          const result = resultArray[0][i]
      
          const div = document.createElement('div');
          const h3 =  document.createElement('h3');
          const description = document.createElement('p')
          const location = document.createElement('p');
          const appLink =document.createElement('a')
          
          div.setAttribute("id", result)
          h3.textContent = result.MatchedObjectDescriptor.PositionTitle
          description.textContent = result.MatchedObjectDescriptor.UserArea.Details.JobSummary
          location.textContent = result.MatchedObjectDescriptor.PositionLocationDisplay
          location.setAttribute('lat', result.MatchedObjectDescriptor.PositionLocation[0].Latitude)
          location.setAttribute('lon', result.MatchedObjectDescriptor.PositionLocation[0].Longitude)
          appLink.setAttribute('href=', )
        
          contentEl.appendChild(div)
          div.appendChild(h3)
          div.appendChild(location)
        }
    }
      
   window.addEventListener("load", (event) => {
      getDropDown()

     });

  fetchButton.addEventListener('click', function(event){
    getApi()
    setLocal()
  })

  prevButton.addEventListener('click', function(event){
    getLocal()
    getPrev()
  })

 function setLocal(){
  localStorage.setItem('previousArray', JSON.stringify(previousArray))
 } 

 function getLocal(){
  const previousArray = localStorage.getItem('previousArray')
  JSON.parse(previousArray)
  console.log(previousArray)
 }

function getPrev() {
  const keyword = previousArray.keyword
  const agencyOptionId = previousArray.agencyOptionId
  const typeOptionId = previousArray.typeOptionId

  console.log(keyword)
  
  const prevUrl = searchUrl+"&keyword="+keyword+'&Organization='+agencyOptionId
  +"&PositionSchedule="+typeOptionId

  console.log(prevUrl)
    
  fetch(prevUrl, {

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
        resultArray.unshift(data.SearchResult.SearchResultItems);
        console.log(data);
        console.log(resultArray)
      })

      .then(function(data) {
        contentEl.innerhtml='';
        for (let i = 0; i < resultArray[0].length; i++) {
          const result = resultArray[0][i]
      
          const div = document.createElement('div');
          const h3 =  document.createElement('h3');
          const location = document.createElement('p');
          
          div.setAttribute("id", result.MatchedObjectId)
          h3.textContent = result.MatchedObjectDescriptor.PositionTitle
          location.textContent = result.MatchedObjectDescriptor.PositionLocationDisplay
          h3.setAttribute('lat', result.MatchedObjectDescriptor.PositionLocation[0].Latitude)
          h3.setAttribute('lon', result.MatchedObjectDescriptor.PositionLocation[0].Longitude)
        
          contentEl.appendChild(div)
          div.appendChild(h3)
          div.appendChild(location)
      }})
    
      }
//   blocker, no error messages are being logged even though dev tools icon show errors


