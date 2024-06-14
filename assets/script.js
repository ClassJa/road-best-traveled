const modalPopUp = document.querySelector('#label')
const modal = document.querySelector('#select-modal')
const closeB = document.querySelector('.show')
const map = document.querySelector('#map');

const submit = document.querySelector('#submit-btn')


function showModalForJob(event){
  event.preventDefault()
  modal.setAttribute('style', 'visibility: visible')
}

// jobBtn.addEventListener('click', showModalForJob)


function showModal(event) {
  event.preventDefault
  modal.setAttribute('style', 'visibility: visible')
  // collect user input from select agency, job type and populates the jobs in the modal 

}

closeB.addEventListener('click', closeBtn)
function closeBtn(event){
  event.preventDefault
  modal.setAttribute('style', 'visibility: hidden')
}


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


        if (resultArray[0].length === 0) {
          console.log("None")
          const div = document.createElement('div')
          const h2 = document.createElement('h2')
          h2.textContent = "No Entries Available"
          div.setAttribute('class', 'no-entry-style')
          contentEl.appendChild(div)
          div.appendChild(h2)
      }})
    

      .then(function(data) {
        contentEl.innerhtml='';
          
        for (let i = 0; i < resultArray[0].length; i++) {
          const result = resultArray[0][i]


            // h3.textContent = result.MatchedObjectDescriptor.PositionTitle
          // }
      
          // const div = document.createElement('div');
          const div = document.createElement('button');
          div.setAttribute('class', 'job-styling')

          const h3 =  document.createElement('h3');
          h3.setAttribute('class', 'bold-letters')
          const location = document.createElement('p');
          

          div.setAttribute("id", result)
          h3.setAttribute('data-jobId', result.MatchedObjectId)


          // console.log(result, typeof(result))
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
      
          const div = document.createElement('button');
          const h3 =  document.createElement('h3');
          const description = document.createElement('p')
          const location = document.createElement('p');
          const appLink = document.createElement('a')
          
          div.setAttribute("id", JSON.stringify(result))
          const jobBtn = document.getElementById(JSON.stringify(i))

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
   
    getPrev()
  })

 function setLocal(){
  localStorage.setItem('previousArray', JSON.stringify(previousArray))
 } 

 function getLocal(){
  const previousArray = localStorage.getItem('previousArray')
  
 }

function getPrev() {
  const previousArray = JSON.parse(localStorage.getItem('previousArray'))
  const keyword = previousArray[0].keyword
  const agencyOptionId = previousArray[0].agencyOptionId
  const typeOptionId = previousArray[0].typeOptionId
console.log(previousArray)
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
      
          // const div = document.createElement('div');
          const div = document.createElement('button');
          div.setAttribute('class', 'job-styling')

          const h3 =  document.createElement('h3');
          h3.setAttribute('class', 'bold-letters')
          const location = document.createElement('p');
          

          div.setAttribute("id", result)
          h3.setAttribute('data-jobId', result.MatchedObjectId)

          h3.textContent = result.MatchedObjectDescriptor.PositionTitle
          location.textContent = result.MatchedObjectDescriptor.PositionLocationDisplay
          location.setAttribute('lat', result.MatchedObjectDescriptor.PositionLocation[0].Latitude)
          location.setAttribute('lon', result.MatchedObjectDescriptor.PositionLocation[0].Longitude)
        
          contentEl.appendChild(div)
          div.appendChild(h3)
          div.appendChild(location)
      }})
    
      }




  /* This helps access the information from the response's data into our modal */
  /* Also opens the overlay and map within it */
  document.querySelector('#content-container').addEventListener('click', function(event) {
      if (event.target.tagName === 'H3') {
        console.log(event.target.getAttribute('data-jobid'))
        const job = resultArray[0].find(function (result) {
          console.log(result[0])
          return  event.target.getAttribute('data-jobid') === result.MatchedObjectId;
        })

        const jobTitleLocation = document.querySelector('#js-job-title');
        const jobDescription = document.querySelector('#job-description-text')
        const modal = document.querySelector('#select-modal')
        const overlay = document.querySelector('#overlay')
        const modalBody = document.querySelector('#modal-body');

        modal.setAttribute('style', 'visibility: visible');
        overlay.setAttribute('style', 'visibility: visible');

        jobTitleLocation.textContent = job.MatchedObjectDescriptor.PositionTitle;
        jobDescription.textContent = job.MatchedObjectDescriptor.UserArea.Details.JobSummary;
      


        console.log(job);
        console.log(job.MatchedObjectDescriptor.PositionTitle)
        console.log(job.MatchedObjectDescriptor.UserArea.Details.JobSummary)
        

        const createMap = document.createElement('div');
        createMap.setAttribute('id', 'map');
        modalBody.appendChild(createMap);


        
        var map = L.map('map').setView([job.MatchedObjectDescriptor.PositionLocation[0].Latitude, job.MatchedObjectDescriptor.PositionLocation[0].Longitude], 13);

        
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      var marker = L.marker([job.MatchedObjectDescriptor.PositionLocation[0].Latitude, job.MatchedObjectDescriptor.PositionLocation[0].Longitude]).addTo(map);
      marker.bindPopup("<b>Job Location</b>").openPopup();




  }})

  document.querySelector('#modal-quit-button').addEventListener('click', function (event) {
    const cancelBtn = document.querySelector('#modal-quit-button');
    const modal = document.querySelector('#select-modal')
    const overlay = document.querySelector('#overlay')
    const map = document.querySelector('#map');

    map.remove();

    overlay.setAttribute('style', 'visibility: hidden')
  })
  




//   blocker, no error messages are being logged even though dev tools icon show errors


