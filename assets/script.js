let keyword = prompt("Enter your desired agency")

const APIKey = "f+m7/YyogybRKvTgVDkyYCL5ScgVxx8KL49/DEOPiJE="
// const selects = $("#selects");
// const selectsTwo =$("#selectsTwo")
// const searchInput = $('#search-input');
// const fetchButton = $('button')

keyword.toLowerCase()

function getApi() {
    const requestUrl = `https://developer.usajobs.gov/codelist/agencysubelements/Search?q=${keyword}`;
  
    fetch(requestUrl, {
        method: "GET",
        headers: {                  
            "Authorization-Key": APIKey      
        }}
    )
      .then(function (response) {
        if (!ok) {
            throw new Error(`HTTP error! Status: ${Response.status}`);
        }
        return response.json();

      })

      .then((data) => {
        console.log(data);
        return data
    
      });
  }