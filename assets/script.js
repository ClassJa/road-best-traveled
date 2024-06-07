const APIKey = "f+m7/YyogybRKvTgVDkyYCL5ScgVxx8KL49/DEOPiJE="
const selects = $("#selects");
const selectsTwo =$("#selectsTwo")
const searchInput = $('#search-input');
const fetchButton = $('button')

function getApi() {
    const requestUrl = 'https://data.usajobs.gov/api/codelist/agencysubelements';
  
    fetch(requestUrl, {
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
    
      });
  }